import { Component, Input } from '@angular/core';
import { IMessage } from './message.type';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  
  @Input()
  content!: string;
  
  @Input()
  content_type!:string;
  
  @Input()
  username!: string;
  
  @Input()
  pfp!: string;

  @Input()
  id!: number;
}

