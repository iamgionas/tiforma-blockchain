import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDetailComponent } from './find-detail.component';

describe('FindDetailComponent', () => {
  let component: FindDetailComponent;
  let fixture: ComponentFixture<FindDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
