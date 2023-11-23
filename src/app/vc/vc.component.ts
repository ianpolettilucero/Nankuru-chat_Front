import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vc',
  templateUrl: './vc.component.html',
  styleUrls: ['./vc.component.css']
})
export class VcComponent {

  constructor(private router:Router) { }

  goToChat()
  {
    this.router.navigate(['/chat']);
  }
}
