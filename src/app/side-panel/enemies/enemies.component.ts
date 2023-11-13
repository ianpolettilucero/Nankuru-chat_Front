import { Component, Input } from '@angular/core';
import { IEnemy } from 'src/app/types/enemy.type';

@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.css']
})
export class EnemiesComponent {

  @Input()
  enemies!:IEnemy[];

}

