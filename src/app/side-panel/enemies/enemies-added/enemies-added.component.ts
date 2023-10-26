import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-enemies-added',
  templateUrl: './enemies-added.component.html',
  styleUrls: ['./enemies-added.component.css']
})
export class EnemiesAddedComponent {
  @Input() 
  name!: string;
  @Input()
  pfp!: string;
}
