
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipe } from 'src/Services&Objects/recipe.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private firestore: AngularFirestore) { }



  getPolicies() {
    return this.firestore.collection('policies').snapshotChanges();
  }

  createPolicy(policy: Recipe) {
    return this.firestore.collection('policies').add(policy);
  }

  updatePolicy(policy: Recipe) {
    delete policy.id;
    this.firestore.doc('policies/' + policy.id).update(policy);
  }

  deletePolicy(policyId: string) {
    this.firestore.doc('policies/' + policyId).delete();
  }
}


