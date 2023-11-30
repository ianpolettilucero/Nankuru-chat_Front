import { Injectable } from '@angular/core'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class WsServiceService {

  private socket$ = webSocket('wss://172.16.255.220')
  public messages$ = this.socket$.asObservable()

  constructor() { }

  public sendMessage(msg: string){
    this.socket$.next(msg)
  }

}
