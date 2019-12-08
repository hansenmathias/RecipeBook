import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogindComponent} from './logind/logind.component';
import {MainScreenComponent} from './main-screen/main-screen.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {AddComponent} from './add/add.component';
import {EditDeleteComponent} from './edit-delete/edit-delete.component';
import {ReadRecipeComponent} from './read-recipe/read-recipe.component';


export const routes: Routes = [
  {path: '', component: LogindComponent},
  {path: 'login', component: LogindComponent},
  {path: 'main', component: ReadRecipeComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit', component: EditDeleteComponent},
  {path: 'read', component: MainScreenComponent},
  {path: '**', redirectTo: '/pagenotfound'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }



