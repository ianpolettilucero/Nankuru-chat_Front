import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  getServersByUser(id_user:number) 
  {
    return this.http.get(
      `${environment.api_url}/user/${id_user}/servers`,
      { headers: { 'Authorization': this.getToken() } }
    );
  }

  getServer(id_server:number)
  {
    return this.http.get(
      `${environment.api_url}/server/${id_server}`,
      { headers: { 'Authorization': this.getToken() } }
    );
  }

  getChannels(id_server:number) 
  {
    return this.http.get(
      `${environment.api_url}/server/${id_server}/channels`,
      { headers: { 'Authorization': this.getToken() } }
    );
  }

  getMessages(id_server:number, id_channel:number) {
    return this.http.get(
      `${environment.api_url}/server/${id_server}/channel/${id_channel}/messages`,
      { headers: { 'Authorization': this.getToken() } }
    );
  }

  addMessage(id_server:number, id_channel:number, id_sender:number, content:string, content_type:string)
  {
    return this.http.post(
      `${environment.api_url}/server/${id_server}/channels/${id_channel}/messages`,
      { 
        id_sender: id_sender,
        content: content,
        content_type: content_type,
      },
      { 
        headers: 
        { 
          'Authorization': this.getToken(),
          'Content-Type': 'application/json'
        } 
      }
    )
  }

  getToken():string 
  {
    return localStorage.getItem(environment.localstorage_token_key) || 'invalid-token';
  }

}
