import { Component, Input } from '@angular/core';
import { IUser } from '../login/login.component';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {

  @Input()
  user:IUser = {} as IUser;
  
}

