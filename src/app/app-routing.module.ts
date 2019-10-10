import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogindComponent} from './logind/logind.component';
import {MainScreenComponent} from './main-screen/main-screen.component';
import {SignUpComponent} from './sign-up/sign-up.component';


export const routes: Routes = [
  {path: '', component: LogindComponent},
  {path: 'login', component: LogindComponent},
  {path: 'main', component: MainScreenComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '**', redirectTo: '/pagenotfound'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }



