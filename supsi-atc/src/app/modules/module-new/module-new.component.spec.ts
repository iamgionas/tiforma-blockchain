import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleNewComponent } from './module-new.component';

describe('ModuleNewComponent', () => {
  let component: ModuleNewComponent;
  let fixture: ComponentFixture<ModuleNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
