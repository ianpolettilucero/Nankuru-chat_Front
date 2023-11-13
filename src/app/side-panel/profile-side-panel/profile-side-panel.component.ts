import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-side-panel',
  templateUrl: './profile-side-panel.component.html',
  styleUrls: ['./profile-side-panel.component.css']
})
export class ProfileSidePanelComponent {
  @Input()
  username!:string;

  @Input()
  descripcion!:string;
  
  @Input()
  salitreDate: string = '9/11/2001';
  
  @Input()
  gmail!:string;

  @Input()
  pfp!:string;
}
