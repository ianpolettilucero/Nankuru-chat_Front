import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/types/user.type'; 
import { ChatService } from '../../chat.service';
import { ChatComponent } from '../../chat.component';
import { first, firstValueFrom } from 'rxjs';
import { IServer } from 'src/app/types/server.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  @Input()
  users: IUser[] = [];

  @Input()
  userId!:string;

  constructor(
    private chatService:ChatService,
    private chat:ChatComponent
  ) { }

  submit()
  {
    if (!this.userId) return;

    firstValueFrom(this.chatService.getServer(this.chat.cur_server_id))
    .then(server => 
    {
      const exists = (server as IServer).users.filter(user => { return user.id == parseInt(this.userId)})[0];
      
      if (exists) return; // user is already in server

      console.log(`adding user ${this.userId} to server ${this.chat.cur_server_id}`)

      this.chatService.addUserToServer(this.chat.cur_server_id, parseInt(this.userId))
      .subscribe(() => 
      {
        firstValueFrom(this.chatService.getUser(parseInt(this.userId)))
        .then(user => 
        {
          this.chat.servers
          .filter(server => { return server.id == this.chat.cur_server_id})[0]
          .users.push(user as IUser);
        })
        .catch(err => {});
      });
    })
    .catch((err) => {});

   
  }
}
