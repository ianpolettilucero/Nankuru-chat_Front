import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments';
import { IMessage } from '../message/message.type';

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
        name: id,
        content: '-'
      }
    );
  }

  public sendMessage(msg: IMessage){

    const parsedMsg = 
    {
      type: 'msg',
      name: msg.username,
      content: JSON.stringify(msg)
    }

    console.log(parsedMsg);

    this.socket$.next(parsedMsg)
  }
}
