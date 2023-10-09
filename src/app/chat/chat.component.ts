import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { environment } from 'src/environments';
import { firstValueFrom } from 'rxjs';
import { IMessage } from './message/message.type';
import { IServer } from './server/server.type';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  user_input!:string;

  messages: IMessage[] = [];  
  servers: IServer[] = [];
  user!: IUser;
    
  // [TEMPORAL] USAR LOCALSTORAGE DESPUES
  cur_channel_id:number = 12;
  cur_server_id:number = 2;
  serverName:string = 'choose a server and channel :p';

  constructor(private chatService:ChatService) {}

  async ngOnInit()
  {
    const userId = localStorage.getItem(environment.localStorage_user_id);

    if (!userId) return;

    // get all servers where user is member
    this.servers = await firstValueFrom(
      this.chatService.getServersByUser(parseInt(userId))
    ) as IServer[];
    
    // load user data
    this.user = await firstValueFrom(this.chatService.getUser(parseInt(userId))) as IUser;
    
    // if no server/channel is stored in localdata dont fetch anything
    if (this.cur_channel_id == 0 || this.cur_server_id == 0) return; 

    this.messages = await firstValueFrom(
      this.chatService.getMessages(
        this.cur_server_id, 
        this.cur_channel_id
      )
    ) as IMessage[];
    this.messages.reverse();
  }

  addMessage()
  {
    const userId = localStorage.getItem(environment.localStorage_user_id);

    if (!userId) return;

    this.chatService.addMessage(
      this.cur_server_id,                     // current server
      this.cur_channel_id,                    // current channel
      parseInt(userId),                       // user that sent message (string to number)
      this.user_input,                        // content
      this.assumeContentType(this.user_input) // content type
    )
    .subscribe(() => {
      //magia de malitto
      this.messages.push(
        {
          content:      this.user_input,
          content_type: this.assumeContentType(this.user_input),
          username:     this.user.username,
          pfp:          this.user.pfp
        }
      );
      this.clearInput();
    });
    
  }

  changeChannel(id_channel:number)
  {
    this.cur_channel_id = id_channel; // update current channel
    this.messages = [];               // clear other servers messages

    firstValueFrom(
      this.chatService.getMessages(
        this.cur_server_id, 
        this.cur_channel_id
      )
    )
    // load channels messages
    .then(messages => this.messages = messages as IMessage[])
    .catch(err => console.log(err));
  }

  changeServer(id_server:number)
  {
    this.cur_server_id = id_server;   // change current server
    this.cur_channel_id = 0;          // force user to select channel
    this.messages = [];               // clear messages
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

  private assumeContentType(content:string):string
  {
    console.log('assumeContentType(): -> TODO');
    return 'text'
  }

  private clearInput()
  {
    this.user_input = '';
  }
}

interface IUser 
{
  id: number;
  username: string;
  pfp: string;
}