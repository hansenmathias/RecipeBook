import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogindComponent } from './logind.component';

describe('LogindComponent', () => {
  let component: LogindComponent;
  let fixture: ComponentFixture<LogindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
