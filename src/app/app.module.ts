import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogindComponent } from './logind/logind.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {HeaderComponent} from './header/header.component';
import { AddComponent } from './add/add.component';
import { EditDeleteComponent } from './edit-delete/edit-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    LogindComponent,
    MainScreenComponent,
    SignUpComponent,
    HeaderComponent,
    AddComponent,
    EditDeleteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
