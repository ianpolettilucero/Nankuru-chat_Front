import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(
    email:string, 
    password:string
  )
  {
    return this.http.post(
      `${environment.api_url}/user/login`, 
      {
        username: '-',
        pfp: '-',
        email: email,
        password: password,
        description: '-'
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    )
  }

  getUserByMail(email:string)
  {
    return this.http.get(
      `${environment.api_url}/user/email/${email}`,
      {
        headers: new HttpHeaders({
          'Authorization': this.getToken()
        })
      }
    )
  }

  getToken():string
  {
    return localStorage.getItem(environment.localstorage_token_key) || 'invalid-token';
  }

}
