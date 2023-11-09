import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.css']
})
export class EnemiesComponent {

  @Input()
  enemies: Enemy[] = [];

}

export interface Enemy {
  name: string;
  pfp: string;
}
