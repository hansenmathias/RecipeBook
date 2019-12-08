import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';




@Component({
  selector: 'app-logind',
  templateUrl: './logind.component.html',
  styleUrls: ['./logind.component.css']
})



export class LogindComponent implements OnInit {



  password: string;
  uname: boolean;
  ppassword: boolean;


  constructor(private router: Router, private firestore: AngularFirestore) {
  }

  ngOnInit() {
  }


  login(username: string, password: string) {

    this.uname = false;
    this.ppassword = false;
    // return this.firestore.collection('Users').snapshotChanges().subscribe();

    const userRef = this.firestore.collection('Users').ref.where('Username', '==', username).where('Password', '==', password);
    userRef.get().then((result) => {
      result.forEach(doc => {
        this.uname = true;
        this.ppassword = true;
        if (this.uname && this.ppassword) {
          localStorage.setItem('Username', username);
          this.goToMainScreen();
        }

      });

      console.log('something is wrong');
    });
  }

    // move to new screen
  noAccount() {
    this.router.navigateByUrl('/signup');
  }


  // move to new screen
  goToMainScreen() {
    this.router.navigateByUrl('/main');
  }

  // move to new screen
  goToHome() {
    this.router.navigateByUrl('');
  }



  getUsers(username: string, password: string) {
    this.uname = false;
    this.ppassword = false;
    // return this.firestore.collection('Users').snapshotChanges().subscribe();

    const userRef = this.firestore.collection('Users').ref.where('Username', '==', username).where('Password', '==', password);
    userRef.get().then((result) => {
      result.forEach(doc => {
        this.uname = true;
        this.ppassword = true;
        if (this.uname && this.ppassword) {
          localStorage.setItem('Username', username);
          this.goToMainScreen();
        }

      });

      console.log('something is wrong');
    });
  }



}
