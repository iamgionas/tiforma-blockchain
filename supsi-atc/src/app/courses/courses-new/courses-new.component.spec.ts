import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesNewComponent } from './courses-new.component';

describe('CoursesNewComponent', () => {
  let component: CoursesNewComponent;
  let fixture: ComponentFixture<CoursesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
