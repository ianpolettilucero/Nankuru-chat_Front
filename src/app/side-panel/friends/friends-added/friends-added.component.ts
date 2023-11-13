import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-friends-added',
  templateUrl: './friends-added.component.html',
  styleUrls: ['./friends-added.component.css']
})
export class FriendsAddedComponent {
  
  @Input() 
  name!: string;

  @Input()
  pfp!: string;

}
