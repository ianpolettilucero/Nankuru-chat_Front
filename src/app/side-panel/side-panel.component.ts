import { Component, Input } from '@angular/core';
import { IUser } from '../types/user.type';
import { IFriend } from '../types/friend.type';
import { IEnemy } from '../types/enemy.type';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {

  @Input()
  user!:IUser;

  @Input()
  friends!:IFriend[];

  @Input()
  enemies!:IEnemy[];
  
}

