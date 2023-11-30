import { Component, Input } from '@angular/core';
//import { IChannel } from './channel.type';
import { IChannel } from '../../../types/channel.type';
import { environment } from 'src/environments/environment';
import { ChatComponent } from '../../chat.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {
  
  @Input()
  channel!:IChannel;

  @Input()
  hasNewMessages:boolean = false;

  constructor(private chat:ChatComponent) {}

  changeChannel()
  {
    this.chat.updateChannel(this.channel.id);
  }

  type: string = 'text';  // types: text, voice
}
