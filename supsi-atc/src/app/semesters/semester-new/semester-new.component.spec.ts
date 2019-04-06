import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterNewComponent } from './semester-new.component';

describe('SemesterNewComponent', () => {
  let component: SemesterNewComponent;
  let fixture: ComponentFixture<SemesterNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemesterNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
