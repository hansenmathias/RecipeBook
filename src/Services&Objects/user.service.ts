import { Injectable } from '@angular/core';
import {User} from './user.model';
import {Recipe} from './recipe.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }




  getPolicies() {
    return this.firestore.collection('Users').snapshotChanges();
  }

  createusa(user: User) {
    return this.firestore.collection('Users/').add(user);
  }

  updateusa(user: User) {
    delete user.ID;
    this.firestore.doc('Users/' + user.ID).update(user);
  }

  deleteusa(userID: string) {
    this.firestore.doc('Users/' + userID).delete();
  }
}
