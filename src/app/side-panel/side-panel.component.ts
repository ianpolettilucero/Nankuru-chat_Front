import { Component, Input } from '@angular/core';
import { IUser } from '../login/login.component';
import { Friend } from './friends/friends.component';
import { Enemy } from './enemies/enemies.component';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {

  @Input()
  user!:IUser;

  @Input()
  friends: Friend[] = [];

  @Input()
  enemies: Enemy[] = [];
  
}

