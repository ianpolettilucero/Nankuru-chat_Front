import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  register(
    username:   string,
    pfp:        string,
    email:      string, 
    password:   string,
    description:string
  )
  {
    return this.http.post(
      `${environment.api_url}/user/register`,
      {
        username: username,
        pfp: pfp,
        email: email,
        password: password,
        description: description
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}
