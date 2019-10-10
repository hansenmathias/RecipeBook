import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


interface Logind {
  companyID: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  phone: string;
  roles: string;
  userCreated: string;
  userId: string;
  username: string;
  votes: string;
}



@Component({
  selector: 'app-logind',
  templateUrl: './logind.component.html',
  styleUrls: ['./logind.component.css']
})



export class LogindComponent implements OnInit {
  user: string;
  url: string;
  logInForm: FormGroup;
  username: string;
  password: string;
  emai: string;
  urlRest: string;




  constructor( private router: Router) {
    this.url = 'http://localhost:8080/BoilerPlate_war/rest/login/';


    this.urlRest = 'http://130.225.170.204:11791/Gruppe30/rest/login';
  }

    ngOnInit() {
    }



login(username1: string, password1: string) {
    this.username = username1;
    this.password = password1;
    console.log(username1);
    console.log(password1);
    this.goToMainScreen();


}




noAccount() {
  this.router.navigateByUrl('/signup');
}


  goToMainScreen() {
  this.router.navigateByUrl('/main');
}



goToHome() {
  this.router.navigateByUrl('');
}




}
