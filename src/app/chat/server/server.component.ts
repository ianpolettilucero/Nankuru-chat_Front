import { Component, Input } from '@angular/core';
import { ChatComponent } from '../chat.component';
import { ChatService } from '../chat.service';
import { IChannel } from './../../types/channel.type';
import { firstValueFrom } from 'rxjs';
import { IServer } from 'src/app/types/server.type';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  
  @Input()
  id!: number;

  @Input()
  serverName!: string;
  
  @Input()
  pfp!: string;
  
  @Input()
  channels!: IChannel[];

  @Input()
  newChannelName: string = '';

  errMsg: string = '';

  @Input()
  hasNewMessages: boolean = false;

  newMessageIndicator: string = this.hasNewMessages ? '@' : '' ;

  constructor(
    private chat:ChatComponent,
    private chatService: ChatService
  ) {}

  changeServer()
  {
    this.chat.updateServer(this.id);
  }

  addChannel()
  {
    if (this.newChannelName.length <= 0)  this.errMsg = 'Channel name cannot be empty';
    if (this.newChannelName.length >  32) this.errMsg = 'Channel name cannot be longer than 32 characters'

    if (this.errMsg != '') return;
    this.errMsg = '';

    let channel:IChannel = {
      id: 0,
      name: this.newChannelName,
      description: '',
      messages: [],
      hasNewMessages: false
    }

    this.chatService.addChannel(this.id, channel)
    .subscribe(res => 
    {

      // @ts-ignore
      channel.id = res.insertId

      this.chat.servers
      .filter(server => { return server.id == this.id})[0]
      .channels
      .push(channel);

      this.newChannelName = '';

    })
  }
  
}
