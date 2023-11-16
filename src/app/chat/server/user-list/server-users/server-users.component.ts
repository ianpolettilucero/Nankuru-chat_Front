import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-users',
  templateUrl: './server-users.component.html',
  styleUrls: ['./server-users.component.css']
})
export class ServerUsersComponent {
  
  @Input()
  name!: string;
  
  @Input()
  pfp!: string;

  @Input()
  id!: number;
}