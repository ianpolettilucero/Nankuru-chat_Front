import { AfterViewChecked, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { environment } from 'src/environments';
import { firstValueFrom } from 'rxjs';
import { IMessage } from './message/message.type';
import { IServer } from '../types/server.type';
import { WsService } from './websocket/ws.service';
import { Router } from '@angular/router';
import { IUser, defaultIUser } from '../types/user.type';
import { isUrl } from '../utils/isUrl.utils';
import { getCurse } from '../utils/curseGenerator.util';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  // #scrollMe
  @ViewChild('scrollMe') 
  private myScrollContainer!: ElementRef;

  @Input()
  user_input:string = '';

  messages: IMessage[] = [];  
  servers:  IServer [] = [];
  user:     IUser = defaultIUser();
  
  serverName !:string;;
  channelName!:string;

  errMsg: string = '';

  cur_channel_id!: number;
  cur_server_id!:  number;

  constructor(
    private chatService: ChatService,
    private wsService:   WsService,
    private router:      Router
  ) { }

  async ngOnInit()
  {

    const userId = localStorage.getItem(environment.localStorage_user_id);
    
    if (!userId) 
    {
      this.router.navigate(['/login']);
      return;
    }

    this.wsService.messages$.subscribe();

    this.wsService.login(userId);

    this.servers = await firstValueFrom(this.chatService.getServersByUser(parseInt(userId))) as IServer[];

    this.user    = await firstValueFrom(this.chatService.getUser(parseInt(userId))) as IUser;

    this.scrollToBottom();

  }

  ngAfterViewChecked()
  {
    this.scrollToBottom();
  }

  addMessage()
  {
    const userId = localStorage.getItem(environment.localStorage_user_id);
    
    if (!userId) 
    {
      this.router.navigate(['/landing']);
      return;
    }

    this.wsService.messages$.subscribe();

    if (!this.user_input.replace(/\s/g, '').length) return;

    this.chatService.addMessage(this.cur_server_id, this.cur_channel_id, parseInt(userId), this.user_input, this.assumeContentType(this.user_input))
    .subscribe(() => {

      const message:IMessage = {
        id:           parseInt(userId),
        content:      this.user_input,
        content_type: this.assumeContentType(this.user_input),
        username:     this.user.username,
        pfp:          this.user.pfp
      }

      const userIds = () => {
        let out:number[] = [];
        this.servers
        .filter(server => { return server.id == this.cur_server_id })[0]
        .users
        .forEach(user => out.push(user.id));
        return out;
      }

      this.wsService.sendMessage(
        message, 
        this.cur_server_id, 
        this.cur_channel_id,
        userIds()
      );

      this.messages.push(message);
      this.clearInput();
      
    });
    
  }

  updateChannel(id_channel:number)
  {
    this.cur_channel_id = id_channel;
    this.messages       = [];

    this.channelName = this.servers
    .filter(server  => { return server.id  == this.cur_server_id })[0].channels
    .filter(channel => { return channel.id == id_channel         })[0].name;


    firstValueFrom(this.chatService.getMessages(this.cur_server_id, this.cur_channel_id))
    .then(messages => {
      
      this.messages = (messages as IMessage[]).reverse();
      
      this.wsService.messages$
      .subscribe(raw_msg => 
      {
        const wsMsg = raw_msg as {
          type:      string, 
          pfp:       File | undefined, 
          server:    number, 
          channel:   number, 
          timeStamp: string, 
          content:   string, 
          file:      File | undefined 
        };

        console.log(wsMsg);
        
        // check user is in current server and channel
        if (wsMsg.server != this.cur_server_id || wsMsg.channel != this.cur_channel_id) return;

        // to avoid socket problem of sending same message twice
        if (this.lastSentDate == +wsMsg.timeStamp) return;
        
        this.lastSentDate = +wsMsg.timeStamp;
          
        const msg = JSON.parse(wsMsg.content) as IMessage;
        // no tengo idea de como hacer esto, hay q setear la ruta aca
        // msg.pfp = wsMsg.pfp?.toString() as string; 
        this.messages.push(msg);

      });
    })
    .catch(err => {});
  }

  updateServer(id_server:number)
  {
    this.cur_server_id  = id_server;
    this.messages       = [];

    this.serverName = this.servers.filter(server => { return server.id == id_server })[0].name;
  }

  @HostListener('window:keydown', ['$event'])
  onEnterPress(event:KeyboardEvent)
  {
    switch (event.key)
    {
      case 'Enter':
        this.addMessage();
        break;
    }
  }

  logout()
  {
    localStorage.removeItem(environment.localstorage_token_key);
    localStorage.removeItem(environment.localStorage_user_id);
    localStorage.removeItem(environment.localstorage_cur_server);
    localStorage.removeItem(environment.localstorage_cur_channel);

    this.router.navigate(['/login']);
  }


  private assumeContentType(content:string):string
  {

    if (isUrl(content)) return 'url';

    return 'text';
  }

  private scrollToBottom()
  {
    try 
    {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
    catch(err) {}
  }

  getUsers()
  {
    let data: IUser[];
    try 
    {
      data = this.servers.filter(server => { return server.id == this.cur_server_id})[0].users.sort();
    }
    catch (err)
    {
      data = [];
    }
    return data;
  }

  private lastSentDate:number = 0;

  private clearInput()
  {
    this.user_input = '';
  }

  newServerName:string = '';

  addServer()
  {

    if (this.newServerName === undefined) this.errMsg='Nombre demasiado corto';
    if (this.newServerName.length <= 0)   this.errMsg='Nombre demasiado corto';
    if (this.newServerName.length >  20)  this.errMsg='Nombre demasiado largo';

    if (this.errMsg != '') return;
    this.errMsg = '';

    const server:IServer = {
      id:          0,
      name:          this.newServerName,
      description:          'NYI',
      picture:          'unspecified',
      channels:          [],
      users:          []
    }

    this.chatService.addServer(server)
    .subscribe(res => 
    {
      // @ts-ignore
      const serverId = res.insertId;

      // add user to server
      this.chatService.addUserToServer(serverId, this.user.id)
      .subscribe(() => {

        // clear input
        this.newServerName = '';
        
        // update server list
        firstValueFrom(this.chatService.getServersByUser(this.user.id))
        .then(servers => this.servers = servers as IServer[])
        .catch(err =>    this.errMsg = err.toString());
      });
    });
    
  }

  sendCurses()
  {
    this.user_input = getCurse()
    this.addMessage();
  }

}
