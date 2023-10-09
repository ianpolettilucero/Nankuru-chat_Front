import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RegisterService } from './register.service';
import { LoginService } from '../login/login.service';

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
  password:string = '';

  @Input()
  desc:string = '';

  @Input()
  pfp:string = '';  //TODO

  constructor(
    private registerService:RegisterService,
    private loginService:LoginService
  ) { }

  submit()
  {
    //this.service.testRequest().subscribe(data => console.log('Response:', data)); return;

    if (!this.validateAllData()) return;

    this.toBase64(this.pfp);

    this.registerService.register(
      this.user, 
      this.pfp, 
      this.email, 
      this.password, 
      this.desc
    )
    .subscribe(data => {
      console.log('Response:', data);
      // kaligrametro@gmail.com
      // 123456
    });
  }

  toBase64(image:string) 
  {
    console.log('toBase64(): -> TODO');
  }
  
  // validations

  isMailValid(mail:string):boolean
  {
    console.log('isMailValid(): -> TODO')
    return true; 
  }

  isPasswordValid(password:string):boolean
  {
    console.log('isPasswordValid(): -> TODO')
    return true;
  }

  validateAllData():boolean 
  {
    
    if (this.user == '') {
      alert('Username can\'t be empty');
      return false;
    }

    if (this.email == '') {
      alert('Email can\'t be empty');
      return false;
    }

    if (this.password == '') {
      alert('Password can\'t be empty');
      return false;
    }

    if (!this.isMailValid(this.email)) {
      alert('Email is not valid');
      return false;
    }

    if (!this.isPasswordValid(this.password)) {
      alert('Password is not valid');
      return false;
    }

    return true;
  }

}
