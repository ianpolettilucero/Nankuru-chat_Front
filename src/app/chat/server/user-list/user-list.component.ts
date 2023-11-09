import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/types/user.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  @Input()
  users: IUser[] = [];

}

