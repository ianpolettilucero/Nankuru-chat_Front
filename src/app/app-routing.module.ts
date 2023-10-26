import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ServerComponent } from './chat/server/server.component';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    title: 'Chat'
  },
  {
    path: 'landing',
    component: LandingComponent,
    title: 'Landing'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: 'test',
    component: ServerComponent,
    title: 'test'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
