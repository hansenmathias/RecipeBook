
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../Services&Objects/user.service';

import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';


interface Users {
  ID: string;
  Username: string;
  Password: string;
  Email: string;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  password: string;
  email: string;
  model: Users;
  successMsg = 'Data successfully saved.';

  productsRef: AngularFirestoreCollection<Users>;


  constructor(private firestore: AngularFirestore, private userservice: UserService, private router: Router) {
  }


  // initalizions of variables
  ngOnInit() {
    this.productsRef = this.firestore.collection<Users>('Users');
    this.model = {
      ID: '',
      Username: '',
      Password: '',
      Email: '',
    };
  }

  // the user created. ID could be made so it was a uniq number
  create(username1: string, password1: string, email1: string) {
    this.model = {
      ID: '3',
      Username: username1,
      Password: password1,
      Email: email1,
    };

    // here could be added something if two username is the same
    // add it to database and give a messesage to the user
    this.productsRef.add(this.model).then( _ => alert(this.successMsg));

   // move to next class
    this.router.navigateByUrl('/login');
  }



  goToHome() {
    this.router.navigateByUrl('');
  }

}


