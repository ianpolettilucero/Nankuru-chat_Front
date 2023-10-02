import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { environment } from 'src/environments';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  input!:string;

  serverName: string = 'Aldea titi - Distrito bubu';

  // for easier API use
  cur_channel_id!:number;
  cur_server_id!:number;

  constructor(private chatService:ChatService) { }

  private assumeContentType(content:string):string
  {
    console.log('assumeContentType(): -> TODO');
    return 'text'
  }

  ngOnInit()
  {
    const userId = localStorage.getItem(environment.localStorage_user_id);

    if (!userId) return;

    this.chatService.getServersByUser(parseInt(userId))
    .subscribe(data => {
      console.log(data);
      // load messages to local var
    })
  }

  addMessage()
  {
    const userId = localStorage.getItem(environment.localStorage_user_id);

    if (!userId) return;

    this.chatService.addMessage(
      this.cur_server_id,               // current server
      this.cur_channel_id,              // current channel
      parseInt(userId),                 // user that sent message (string to number)
      this.input,                       // content
      this.assumeContentType(this.input)// content type
    )
  }

  createChannel() 
  {

  }

  grooming()
  {
    console.log('No parecia de 10');
  }
}