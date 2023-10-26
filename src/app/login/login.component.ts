import { Component, Input } from '@angular/core';
import { LoginService } from './login.service';
import { environment } from 'src/environments';

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

  constructor(private loginService:LoginService) { }

  submit()
  {
    if (!this.validateAllData()) return;

    this.loginService.login(this.email, this.password)
    .subscribe(data => {

      const token = data.toString();

      localStorage.setItem(environment.localstorage_token_key, token);

      this.loginService.getUserByMail(this.email)
      .subscribe(user_db => {
        const user:IUser = user_db as IUser;

        //localStorage.setItem(environment.localstorage_email_key, user.email);
        localStorage.setItem(environment.localStorage_user_id, user.id.toString());
      });

      // redirect to /chat
    });
  }

  validateAllData():boolean
  {
    console.log('validateAllData(): -> TODO');
    return true;
  }

}

export interface IUser 
{
  id: number;
  username: string;
  pfp: string;
  email: string;
  password: string;
  description: string;
}
