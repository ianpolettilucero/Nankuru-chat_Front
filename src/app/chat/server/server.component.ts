import { Component, Input } from '@angular/core';
import { IChannel } from './channel/channel.type';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent {
  @Input()
  serverName!: string;
  @Input()
  pfp!: string;
  @Input()
  channels!: IChannel[];
}
