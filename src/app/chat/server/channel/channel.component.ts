import { Component, Input } from '@angular/core';
import { IChannel } from './channel.type';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {
  
  @Input()
  channel!:IChannel;

  type: string = 'text';  // types: text, voice
}
