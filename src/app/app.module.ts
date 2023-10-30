import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './chat/message/message.component';
import { ServerComponent } from './chat/server/server.component';
import { ChannelComponent } from './chat/server/channel/channel.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ProfileSidePanelComponent } from './side-panel/profile-side-panel/profile-side-panel.component';
import { FriendsComponent } from './side-panel/friends/friends.component';
import { EnemiesComponent } from './side-panel/enemies/enemies.component';
import { FriendsAddedComponent } from './side-panel/friends/friends-added/friends-added.component';
import { EnemiesAddedComponent } from './side-panel/enemies/enemies-added/enemies-added.component';
import { UserListComponent } from './chat/server/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent,
    MessageComponent,
    ServerComponent,
    ChannelComponent,
    SidePanelComponent,
    ProfileSidePanelComponent,
    FriendsComponent,
    EnemiesComponent,
    FriendsAddedComponent,
    EnemiesAddedComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
