import { Component, Input } from '@angular/core';
import { IChannel } from './channel/channel.type';
import { environment } from 'src/environments';
import { ChatComponent } from '../chat.component';

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

  constructor(private chat:ChatComponent) {}

  changeServer()
  {
    this.chat.updateServer(this.id);
  }
}
