import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationListComponent } from './certification-list.component';

describe('CertificationListComponent', () => {
  let component: CertificationListComponent;
  let fixture: ComponentFixture<CertificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
