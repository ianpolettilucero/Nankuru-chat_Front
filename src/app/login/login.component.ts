import { Component, HostListener, Input } from '@angular/core';
import { LoginService } from './login.service';
import { environment } from 'src/environments';
import { Router } from '@angular/router';
import { IUser } from '../types/user.type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input()
  email:string = '';

  @Input()
  password:string = '';

  //TODO
  errMsg:string = '';

  constructor(
    private loginService:LoginService,
    private router:Router
  ) { }

  submit()
  {
    if (!this.validateAllData()) return;

    this.email = this.email.replace(/\s/g, ''); // delete empty spaces

    this.loginService
    .login(this.email, this.password)
    .subscribe(
      token => {

        localStorage.setItem(
          environment.localstorage_token_key, 
          token.toString()
        );

        this.loginService
        .getUserByMail(this.email)
        .subscribe(
          user_db => {
            const user:IUser = user_db as IUser;

            localStorage.setItem(
              environment.localStorage_user_id, 
              user.id.toString()
            );
            
            this.router.navigate(['/chat']);
          },
          err => this.errMsg = JSON.parse(JSON.stringify(err)).error.message
        );

      },
      err => this.errMsg = JSON.parse(JSON.stringify(err)).error.message
    );
  }

  validateAllData():boolean
  {
    console.log('validateAllData(): -> TODO');
    return true;
  }

  goToRegister()
  {
    this.router.navigate(['/register']);
  }

  @HostListener('window:keydown', ['$event'])
  onEnterPress(event:KeyboardEvent)
  {
    switch (event.key)
    {
      case 'Enter':
        this.submit();
        break;
    } 
    
  }

}