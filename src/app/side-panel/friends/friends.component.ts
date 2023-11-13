import { Component, Input, OnInit } from '@angular/core';
import { IFriend } from 'src/app/types/friend.type';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {

  @Input()
  friends!: IFriend[];

}

