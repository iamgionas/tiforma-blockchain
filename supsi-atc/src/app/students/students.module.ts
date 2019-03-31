import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';

import { StudentsListComponent } from './students-list/students-list.component'
import { StudentDetailComponent } from './student-detail/student-detail.component';
import {StudentFormComponent} from './student-form/student-form.component';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentDetailComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule
  ]
})
export class StudentsModule { }
