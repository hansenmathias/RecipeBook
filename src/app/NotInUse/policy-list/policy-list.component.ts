import { Component, OnInit } from '@angular/core';

import {Recipe} from '../../../Services&Objects/recipe.model';
import {RecipeService} from '../../../Services&Objects/recipe.service';


@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {

  policies: Recipe[];
  constructor(private policyService: RecipeService) { }

  ngOnInit() {
    this.policyService.getPolicies().subscribe(data => {
      this.policies = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Recipe;
      });
    });
  }

  create(policy: Recipe) {
    this.policyService.createPolicy(policy);
  }

  update(policy: Recipe) {
    this.policyService.updatePolicy(policy);
  }

  delete(id: string) {
    this.policyService.deletePolicy(id);
  }
}
