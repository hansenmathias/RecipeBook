import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface Recipe {
  RRID: string;
  RRname: string;
  USERNAME: string;
  RIdata: string;
  Persons: string;
  PictureID: string;
  ing: any[];
}


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})


export class AddComponent implements OnInit {
  model: Recipe;
  successMsg = 'Data successfully saved.';
  a = null;


  productsRef: AngularFirestoreCollection<Recipe>;


  public Ingrediens: any[] = [{
    RecipeName: '',
    RecipeQuanti: '',
    // RecipeUnit: '',
    kgOrBla: ''
  }];

/* maybe in use
  userprofileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    Name: this.fb.array([
      this.fb.control('')
    ])

  });
*/

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;





  constructor(private http: HttpClient, private firestore: AngularFirestore,  private router: Router,
              private fb: FormBuilder, private storage: AngularFireStorage) {

    this.productsRef = this.firestore.collection<Recipe>('Recipes');
    this.model = {
      USERNAME: '',
      RRID: '',
      RRname: '',
      RIdata: '',
      Persons: '',
      PictureID: '',
      ing: []
    };
  }



  ngOnInit() {
  }


  save(Rname: string, Idata: string, PPersons: string) {

    if (this.a == null) {
      console.log('this is null');
    }


    const name = localStorage.getItem('Username');
    this.model = {
      USERNAME: name,
      RRID: '1',
      RRname: Rname,
      RIdata: Idata,
      Persons: PPersons,
      PictureID: this.a,
      ing: this.Ingrediens ,
    };

    this.productsRef.add(this.model).then( _ => alert(this.successMsg));

    this.goHome();

  }

  goHome() {
    this.router.navigateByUrl('/main');
  }

  addIngrediens() {
    this.Ingrediens.push({
      RecipeName: '',
      RecipeQuanti: '',
     // RecipeUnit: '',
      kgOrBla: ''
    });

    this.logValue();
  }

  removeIngredients(i: number) {
    this.Ingrediens.splice(i, 1);
  }


  logValue() {
    console.log(this.Ingrediens);
  }


  toggleHover(event: boolean) {
    this.isHovering = event;
  }


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
/*
  onFileSelected(event) {
   this.selectedFile = <File> event.target.files[0];

  }
  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.storage.upload(fd, this.selectedFile.name);

  }


*/



/*
  get Name() {
    return this.userprofileForm.get('Name') as FormArray;
  }

  addNewMobile() {
    this.Name.push(this.fb.control(''));
  }
*/


/* onSubmit() {
    console.log('test');

    console.log('mobile 1 is' + this.userprofileForm.get(['Name', '0']).value);
    this.counter = 0;
    for (let mob of this.Name.controls) {
      console.log('mobile log' + this.userprofileForm.get(['Name', this.counter]).value);
      this.counter = this.counter + 1;
    }
  }
*/


}

