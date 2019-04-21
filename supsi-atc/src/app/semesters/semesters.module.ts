import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SemestersRoutingModule } from './semesters-routing.module';
import { SemesterListComponent } from './semester-list/semester-list.component';
import { SemesterDetailComponent } from './semester-detail/semester-detail.component';
import { FormsModule } from '@angular/forms';
import { SemesterNewComponent } from './semester-new/semester-new.component';
import { SemesterEnrollmentComponent } from './semester-detail/semester-enrollment/semester-enrollment.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [
    SemesterListComponent,
    SemesterDetailComponent,
    SemesterNewComponent,
    SemesterEnrollmentComponent
  ],
  imports: [
    CommonModule,
    SemestersRoutingModule,
    FormsModule,
    LoadingModule
  ]
})
export class SemestersModule { }
