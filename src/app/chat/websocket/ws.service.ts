import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  private socket$ = webSocket('wss://172.16.255.220:4356');

  public messages$ = this.socket$.asObservable();

  constructor() {}

  public sendMessage(msg: string){
    this.socket$.next(msg)
  }
}
