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

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';
import { PolicyListComponent } from './NotInUse/policy-list/policy-list.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ComponentnameComponent } from './NotInUse/componentname/componentname.component';
import { ReadRecipeComponent } from './read-recipe/read-recipe.component';
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { DropzoneDirective } from './dropzone.directive';
import { FileUploadComponent } from './NotInUse/file-upload/file-upload.component';
import { FileSizePipe } from './file-size.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LogindComponent,
    MainScreenComponent,
    SignUpComponent,
    HeaderComponent,
    AddComponent,
    EditDeleteComponent,
    PolicyListComponent,
    ComponentnameComponent,
    ReadRecipeComponent,
    DropzoneDirective,
    FileUploadComponent,
    FileSizePipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    ListViewModule,
    HttpClientModule,
    AngularFireStorageModule

  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
