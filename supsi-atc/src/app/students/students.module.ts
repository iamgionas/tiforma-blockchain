import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsListComponent } from './students-list/students-list.component'
import { StudentDetailComponent } from './student-detail/student-detail.component';

import { FormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
    StudentsListComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule
  ]
})
export class StudentsModule { }
