import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { environment } from 'src/environments';
import { firstValueFrom } from 'rxjs';
import { IServer } from '../types/server.type';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input()
  input!:string;

  servers!: IServer[];

  serverName: string = 'Aldea titi - Distrito bubu';

  // [TEMPORAL] USAR LOCALSTORAGE DESPUES
  cur_channel_id:number = 12;
  cur_server_id:number = 2;

  constructor(private chatService:ChatService) { }

  async ngOnInit()
  {
    const userId = localStorage.getItem(environment.localStorage_user_id);

    if (!userId) return;

    // get all servers where user is member
    this.servers = await firstValueFrom(
      this.chatService.getServersByUser(parseInt(userId))
    ) as IServer[];
  }

  @HostListener('window:keydown', ['$event'])
  onEnterPress(event:KeyboardEvent)
  {
    if (event.key === 'Enter') 
    {
      this.addMessage();  // add message
      this.input = '';    // clear input
    }
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
    .subscribe(data => {});
  }

  createChannel() 
  {

  }

  grooming()
  {
    console.log('No parecia de 10');
  }

  private assumeContentType(content:string):string
  {
    console.log('assumeContentType(): -> TODO');
    return 'text'
  }

}