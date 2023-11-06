import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {

  @Input()
  friends: Friend[] = [];

}

export interface Friend {
  name: string;
  pfp: string;
}
