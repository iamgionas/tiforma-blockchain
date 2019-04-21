import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';

import { StudentListComponent } from './student-list/student-list.component'
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudentsRoutingModule,
    LoadingModule
  ]
})
export class StudentsModule { }
