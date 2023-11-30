import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IServer } from '../types/server.type';
import { IChannel } from '../types/channel.type';

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
      `${environment.api_url}/server/${id_server}/channels/${id_channel}/messages`,
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

  getUser(id_user:number)
  {
    return this.http.get(
      `${environment.api_url}/user/${id_user}`,
      { headers: { 'Authorization': this.getToken() } }
    )
  }

  addServer(server:IServer)
  {
    return this.http.post(
      `${environment.api_url}/server`,
      {
        name: server.name,
        description: '',
        picture: server.picture,
      },
      {
        headers: { 
          'Authorization': this.getToken(),
          'Content-Type': 'application/json'
        }
      }
    );
  }

  setUserAsAdmin()
  {
    console.log('TODO-BACK');
    return new Observable();
  }

  addUserToServer(id_server:number, id_user:number)
  {
    return this.http.post(
      `${environment.api_url}/server/${id_server}/users/${id_user}`,
      {},
      {
        headers: {
          'Authorization': this.getToken(),
          'Content-Type': 'application/json'
        }
      }
    );
  }

  addChannel(id_server:number, channel:IChannel)
  {
    return this.http.post(
      `${environment.api_url}/server/${id_server}/channels`,
      {
        name: channel.name,
      },
      {
        headers: {
          'Authorization': this.getToken(),
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // File upload

  uploadFile(data:FormData)
  {
    return this.http.post(
      `${environment.api_url}/cdn/save`,
      data,
      {
        headers: {
          'Authorization': this.getToken(),
        }
      }
    )
  }





  
}
