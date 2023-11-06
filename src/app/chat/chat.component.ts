import { AfterViewChecked, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from './chat.service';
import { environment } from 'src/environments';
import { firstValueFrom } from 'rxjs';
import { IMessage } from './message/message.type';
import { IServer } from './server/server.type';
import { WsService } from './websocket/ws.service';
import { Router } from '@angular/router';
import { Friend } from '../side-panel/friends/friends.component';
import { Enemy } from '../side-panel/enemies/enemies.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') 
  private myScrollContainer!: ElementRef;

  @Input()
  user_input!:string;

  messages: IMessage[] = [];  
  servers:  IServer [] = [];
  user!:    IUser;
  
  serverName !:string;;
  channelName!:string;

  private cur_channel_id!: number;
  private cur_server_id!:  number;

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

    console.log(this.servers);
  }

  ngAfterViewChecked()
  {
    this.scrollToBottom();
  }

  addMessage()
  {
    const userId = localStorage.getItem(environment.localStorage_user_id);

    if (!userId) return;

    if (!this.user_input.replace(/\s/g, '').length) return;

    this.chatService.addMessage(this.cur_server_id, this.cur_channel_id, parseInt(userId), this.user_input, this.assumeContentType(this.user_input))
    .subscribe(() => {

      const message:IMessage = {
        content:      this.user_input,
        content_type: this.assumeContentType(this.user_input),
        username:     this.user.username,
        pfp:          this.user.pfp
      }

      this.wsService.sendMessage(message);

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
      .subscribe(raw_msg => this.messages.push(JSON.parse((raw_msg as {type:string, name:string, content:string}).content) as IMessage))
    })
    .catch(err => { /*console.log(err)*/ });
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
    //console.log('assumeContentType(): -> TODO');
    return 'text'
  }

  private clearInput()
  {
    this.user_input = '';
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
    //if (servers == undefined) return [];
    //console.log('Data',servers);
    return [];
  }

}

interface IUser 
{
  description: string;
  email: string;
  id: number;
  //password: string;
  pfp: string;
  username: string;
  friends:Friend[];
  enemies:Enemy[];
}
