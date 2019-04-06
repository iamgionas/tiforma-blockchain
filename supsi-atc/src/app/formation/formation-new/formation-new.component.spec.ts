import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationNewComponent } from './formation-new.component';

describe('FormationNewComponent', () => {
  let component: FormationNewComponent;
  let fixture: ComponentFixture<FormationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
