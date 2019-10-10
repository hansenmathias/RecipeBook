
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string;
  password: string;
  email: string;




  constructor( private router: Router) {
  }

  ngOnInit() {
  }

  create(username1: string, password1: string, email1: string) {
      this.username = username1;
      this.password = password1;
      this.email = email1;

      console.log(username1);
      console.log(password1);
      console.log(email1);
      //  there need some return from database that this is saved
      this.router.navigateByUrl('/login');
  }

  // onSubmit() {
  //  console.log(this.signUpForm);
  // }

  goToHome() {
    this.router.navigateByUrl('');
  }
}


