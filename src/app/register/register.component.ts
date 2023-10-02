import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Input()
  user:string = '';
  @Input()
  email:string = '';
  @Input()
  desc:string = '';
  @Input()
  password!:string;
  @Input()
  pfp!:string;
}
