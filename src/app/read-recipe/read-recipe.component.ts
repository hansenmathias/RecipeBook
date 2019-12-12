import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {Recipe} from '../../Services&Objects/recipe.model';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';

interface Recipes {
  RRID: string;
  RRname: string;
  USERNAME: string;
  RIdata: string;
  Persons: string;
  PictureID: string;
  ing: Test[];
}
interface Test {
  RecipeName: string;
  RecipeQuanti: string;
  RecipeUnit: string;
  kgOrBla: string;

}



@Component({
  selector: 'app-read-recipe',
  templateUrl: './read-recipe.component.html',
  styleUrls: ['./read-recipe.component.css']
})
export class ReadRecipeComponent implements OnInit {
  RRID = 2;
  RRname = '';

  persons: string;
  rIdata: string;
  ingrediens: string;

  isDataLoaded = false;

  userId: string;
  a = 0;

  images = new Array<any>();

  h: boolean;
  firstname: string;





  public data = new Array<any>(
  );


  private userProfileImg: any;

  // getting data from firebase
  constructor(private router: Router, private firestore: AngularFirestore, private storages: AngularFireStorage) {
    let v = 0;
    // getting data from localStorage
    const name = localStorage.getItem('Username');

    // getting data from firebase
    // here we get the userID sp we can get the pictures.
    const userRef1 = this.firestore.collection<Recipes[]>('Recipes').ref.where('USERNAME', '==', name);
    userRef1.get().then((result ) => {
      result.forEach(doc => {
        if (doc.exists) {
          this.userId = doc.data().PictureID;
          // if userID not null
          if ( this.userId != null) {
            // getting images
            console.log(this.getProfileImageUrl(this.userId));
            console.log(this.userId);

          }
          // we will get load the website
        } else {
          console.log('moveOn');
          this.isDataLoaded = true;
        }
      });
    });

    // here we sleep for 3 sekund so the pictures can get loaded.
    this.delay(3000).then(any=>{

    const userRef = this.firestore.collection<Recipes[]>('Recipes').ref.where('USERNAME', '==', name);
    userRef.get().then((result ) => {
      result.forEach(doc => {

        if (doc.exists) {
          // getting all the variable we need to show the screen
          this.RRID = doc.data().RRID;
          this.RRname = doc.data().RRname;
          this.rIdata = doc.data().RIdata;
          this.persons = doc.data().Persons;
          this.ingrediens = doc.data().ing;
          this.userId = doc.data().PictureID;

            // putting data into an array
          const e = {
            text: this.RRname,
            contact: this.rIdata,
            avatar: 'A',
            id: this.a,
            nypic:  this.images[v]
          };

          this.data.push(e);
          this.a++;
          // this tells the HTML it is load and it can load html
          this.isDataLoaded = true;
          v++;
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
          this.isDataLoaded = true;
        }


      });

      this.isDataLoaded = true;

    });


    });
  }

  ngOnInit() {

  }


  // switch to a new screen
  MoveOnmethod(recipeName: string, decription: number, picture: string) {
    localStorage.setItem('RecipeName', recipeName);
    localStorage.setItem('Picture', picture);
    this.goToReadScreen();
  }


  goToReadScreen() {
    this.router.navigateByUrl('/read');
  }



  // getting image from database
  getProfileImageUrl(userId: string) {

    const userRef = this.firestore.collection<Recipes[]>('photos').ref.where('pictureID', '==', userId);
    userRef.get().then((result ) => {
      result.forEach(doc => {
        if (doc.exists) {
          //saving the path
          const path = doc.data().path;
          console.log(doc.data().path);
          // getting image with the path.
          const userStorageRef = firebase.storage().ref().child(path);
          userStorageRef.getDownloadURL().then(url => {

            // save it under userporfilimg
            this.userProfileImg = url;
            console.log('user' + this.userProfileImg);
            // saving it into a variable b
            const b = {
              pic: this.userProfileImg
            };
              // saving it in an array
            this.images.push(b);
            console.log(this.images);
          });
        }
      });
    });

    this.h = true;
  }


  //sleep method
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }



}
