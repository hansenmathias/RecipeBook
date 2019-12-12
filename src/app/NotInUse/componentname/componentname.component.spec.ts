import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentnameComponent } from './componentname.component';

describe('ComponentnameComponent', () => {
  let component: ComponentnameComponent;
  let fixture: ComponentFixture<ComponentnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
