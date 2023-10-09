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
    
  // [TEMPORAL] USAR LOCALSTORAGE DESPUES
  cur_channel_id:number = 12;
  cur_server_id:number = 2;
  serverName: string = 'Aldea titi - Distrito bubu';

  constructor(private chatService:ChatService) {}

  async ngOnInit()
  {
    const userId = localStorage.getItem(environment.localStorage_user_id);

    if (!userId) return;

    // get all servers where user is member
    this.servers = await firstValueFrom(
      this.chatService.getServersByUser(parseInt(userId))
    ) as IServer[];
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
    .subscribe(data => {
      //magia de malitto
      this.messages.push(
        {
          content:      this.user_input,
          content_type: this.assumeContentType(this.user_input),
          username:     "juanito juan",
          pfp:          ""
        }
      );
      this.clearInput();
    });
    
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

