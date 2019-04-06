import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemestersRoutingModule } from './semesters-routing.module';
import { SemesterListComponent } from './semester-list/semester-list.component';
import { SemesterDetailComponent } from './semester-detail/semester-detail.component';
import { FormsModule } from '@angular/forms';
import { SemesterNewComponent } from './semester-new/semester-new.component';

@NgModule({
  declarations: [
    SemesterListComponent,
    SemesterDetailComponent,
    SemesterNewComponent
  ],
  imports: [
    CommonModule,
    SemestersRoutingModule,
    FormsModule
  ]
})
export class SemestersModule { }
