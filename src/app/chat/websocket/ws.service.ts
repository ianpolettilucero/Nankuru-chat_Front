import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMessage } from '../message/message.type';
import { IUser } from 'src/app/types/user.type';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  private socket$ = webSocket(environment.websocket_url);

  public messages$ = this.socket$;

  constructor() {}

  public login(id:string)
  {
    this.socket$.next(
      {
        type: 'login',
        name: id.toString(),
      }
    );
  }
  

  public sendMessage(msg: IMessage, id_server:number, id_channel:number, users:number[]){

    const parsedMsg = 
    {
      type:      'msg', 
      pfp:       new File([], 'TODO'),
      server:    id_server,
      channel:   id_channel,
      timeStamp: Date.now(),
      content:   JSON.stringify(msg),
      files:     undefined,
      serverUsers: users
    }

    this.socket$.next(parsedMsg)
  }
}
