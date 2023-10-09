import { Component } from '@angular/core';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {
  textChannelName: string = 'Distrito bubu';
  voiceChannelName: string = 'Bubus singing';
}
