import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';

import { StudentListComponent } from './student-list/student-list.component'
import { StudentDetailComponent } from './student-detail/student-detail.component';
<<<<<<< HEAD
import { StudentNewComponent } from './student-new/student-new.component';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentNewComponent
=======
import {StudentFormComponent} from './student-form/student-form.component';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentDetailComponent,
    StudentFormComponent
>>>>>>> front-end-queries
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule
  ]
})
export class StudentsModule { }
