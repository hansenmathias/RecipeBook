import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireStorage} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';

interface Recipes {
  RRID: string;
  RRname: string;
  USERNAME: string;
  RIdata: string;
  Persons: string;
  ing: Test[];
}
interface Test {
  RecipeName: string;
  RecipeQuanti: string;
  RecipeUnit: string;
  kgOrBla: string;

}


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {
  RRID = 2;
  RRname = 'æble';
  RIname: string;
  RIquantity: string;
  RIunit: string;
  kg: string;
  persons: string;
  rIdata: string;
  ingrediens: string;
  picId: string;
  ssingrediens: string;
  ing: [];
  image: string;

  private userProfileImga: any;


// starting page up
  constructor(private router: Router, private firestore: AngularFirestore, private storages: AngularFireStorage ) {

    const name = localStorage.getItem('Username');
    const text = localStorage.getItem('RecipeName');
    this.image = localStorage.getItem('Picture');
    console.log('aa' + this.RRname);
    console.log('running');
    const userRef = this.firestore.collection<Recipes[]>('Recipes').ref.where('USERNAME', '==', name).where('RRname', '==', text);
    userRef.get().then((result ) => {
     result.forEach(doc => {
       if (doc.exists) {
         console.log('bliverkørt');
         console.log(doc.data());
         console.log('bliverkørt');
         this.RRID = doc.data().RRID;
         this.RRname = doc.data().RRname;
         this.rIdata = doc.data().RIdata;
         this.persons = doc.data().Persons;
         this.ingrediens = doc.data().ing;
         this.picId = doc.data().PictureID;
         this.getProfileImageUrl(this.picId);



         console.log(this.RRID);
         console.log(this.RRname);
         console.log(this.rIdata);
         console.log(this.persons);
         console.log(this.ingrediens);

     } else {
       // doc.data() will be undefined in this case
         console.log('No such document!');
      }


     });
     });

  }

  ngOnInit() {
  }

    //delete button
  delete() {
    const name = localStorage.getItem('Username');
    const text = localStorage.getItem('RecipeName');
    const userRef = this.firestore.collection('Recipes').ref.where('USERNAME', '==', name)
      .where('RRname', '==', text);
    userRef.get().then((result ) => {
      result.forEach(doc => {
        if (doc.exists) {
          doc.ref.delete();
          this.goToMainScreen();
        }
      });
    });

  }


  goToMainScreen() {
    this.router.navigateByUrl('/main');
  }

  //switch to new screen
  edit() {
    localStorage.setItem('RRID', String(this.RRID));
    localStorage.setItem('RRname', this.RRname);
    localStorage.setItem('RIdata', this.rIdata);
    localStorage.setItem('Persons', this.persons);
    localStorage.setItem('Ing', this.ingrediens);


    this.goToEditScreen();
  }


  goToEditScreen() {
    this.router.navigateByUrl('/edit');
  }


      // getting the image from firebase
  getProfileImageUrl(userId: string) {


    const userRef = this.firestore.collection<Recipes[]>('photo').ref.where('pictureID', '==', userId);
    userRef.get().then((result ) => {
      result.forEach(doc => {
        if (doc.exists) {

          const path = doc.data().path;
          const userStorageRefa = firebase.storage().ref().child(path);
          userStorageRefa.getDownloadURL().then(url => {
            this.userProfileImga = url;

            console.log(this.userProfileImga);

          });
        }
    });
  });
}





}
