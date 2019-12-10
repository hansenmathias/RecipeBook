import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';


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
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.css']
})
export class EditDeleteComponent implements OnInit {


  successMsg = 'Data successfully saved.';
  RRID: string;
  RRname: string;
  rIdata: string;
  Persons: string;
  productsRef: AngularFirestoreCollection<Recipes>;
  model: Recipes;
  pictureID: string;
  image: string;
  a = null;
  h = false;

  public Ingrediens: any[] = [{
    RecipeName: '',
    RecipeQuanti: '',
   // RecipeUnit: '',
    kgOrBla: ''
  }];


  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;


// getting all data to start the side up
  constructor(private router: Router, private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.productsRef = this.firestore.collection<Recipes>('Recipes');
    const name = localStorage.getItem('Username');
    const text = localStorage.getItem('RecipeName');
    this.image = localStorage.getItem('Picture');

    this.RRID = localStorage.getItem('RRID');
    this.RRname = localStorage.getItem('RRname');
    this.rIdata = localStorage.getItem('RIdata');
    this.Persons = localStorage.getItem('Persons');

// getting data from firebase
    const userRef = this.firestore.collection<Recipes[]>('Recipes').ref.where('USERNAME', '==', name).where('RRname', '==', text);
    userRef.get().then((result ) => {
      result.forEach(doc => {
        if (doc.exists) {


          // the variables
          this.pictureID = doc.data().PictureID;
          this.RRID = doc.data().RRID;
          this.RRname = doc.data().RRname;
          this.rIdata = doc.data().RIdata;
          this.Ingrediens = doc.data().ing;



        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }


      });
    });


  }

  ngOnInit() {
  }

exit() {
    this.goToMainScreen();
}



  goToMainScreen() {
    this.router.navigateByUrl('/main');
  }


  addIngrediens() {
    this.Ingrediens.push({
      RecipeName: '',
      RecipeQuanti: '',
    //  RecipeUnit: '',
      kgOrBla: ''
    });

    this.logValue();
  }

  removeIngrediens(i: number) {
    this.Ingrediens.splice(i, 1);
  }
  logValue() {
    console.log(this.Ingrediens);
  }

    // the update method and the delete in one
  update(Rname: string, Idata: string, PPersons: string) {

    console.log(Rname);

    this.delete();
    console.log(Rname);
    console.log(Idata);
    console.log(PPersons);
    console.log(this.pictureID);
    console.log(this.Ingrediens);
    if (this.a == null) {
      this.a = this.pictureID;
      console.log('inden i a');
      console.log(this.a);
      console.log(this.pictureID);
    }

    const name = localStorage.getItem('Username');
    console.log(name);
   // this.productsRef = this.firestore.collection<Recipes>('Recipes', ref => ref.where('USERNAME', '==' , name));
    this.delay(3000).then(any=> {
      this.model = {
        USERNAME: name,
        RRID: '2',
        RRname: Rname,
        RIdata: Idata,
        Persons: PPersons,
        PictureID: this.a,
        ing: this.Ingrediens,

      };

      console.log('alt skulle være blevet gemt ');
      this.productsRef.add(this.model).then(_ => alert(this.successMsg));
      this.goToMainScreen();
    });
  }


  delete() {
    const name1 = localStorage.getItem('Username');
    const text1 = localStorage.getItem('RecipeName');
    const userRef = this.firestore.collection('Recipes').ref.where('USERNAME', '==', name1)
      .where('RRname', '==', text1);
    userRef.get().then((result ) => {
      result.forEach(doc => {
        if (doc.exists) {
          doc.ref.delete();
        }
      });
    });

    if (this.h === true) {
    const userRef1 = this.firestore.collection('photos').ref.where('pictureID', '=='  , this.pictureID );
    userRef1.get().then((result1) => {
      result1.forEach(doc => {
        if (doc.exists) {
          doc.ref.delete();
        }
      });
    });
    }
  }



  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  // upload images
  startUpload(event: FileList) {

    this.a = this.getRandomInt(200000).toString();

    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = {app: 'My AngularFire-powered PWA!'};

    // The main task
    this.task = this.storage.upload(path, file, {customMetadata});

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.firestore.collection('photos').add({path, size: snap.totalBytes, pictureID: this.a});
          this.h = true;
        }
      })
    );

    // The file's download URL
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())
    )
      .subscribe();
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }



  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
