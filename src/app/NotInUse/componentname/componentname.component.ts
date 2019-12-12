import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-componentname',
  templateUrl: './componentname.component.html',
  styleUrls: ['./componentname.component.css']
})
export class ComponentnameComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  counter: number;
  userprofileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      address1: [''],
      address2: [''],
      state: [''],
      zip: ['']
    }),

    mobiles: this.fb.array([
      this.fb.control('')
    ])
  });


  ngOnInit() {
  }


  get mobiles() {
    return this.userprofileForm.get('mobiles') as FormArray;
  }

  addNewMobile() {
    this.mobiles.push(this.fb.control(''));
  }



  onSubmit() {
    console.log('test');

    console.log('mobile 1 is' + this.userprofileForm.get(['mobiles', '0']).value);
    this.counter = 0;
    for (let mob of this.mobiles.controls) {
    console.log('mobile log' + this.userprofileForm.get(['mobiles', this.counter]).value);
    this.counter = this.counter + 1;
    }
  }


}
