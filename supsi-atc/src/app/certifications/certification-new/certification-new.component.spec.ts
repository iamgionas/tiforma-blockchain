import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationNewComponent } from './certification-new.component';

describe('CertificationNewComponent', () => {
  let component: CertificationNewComponent;
  let fixture: ComponentFixture<CertificationNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
