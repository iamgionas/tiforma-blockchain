import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';

import { StudentListComponent } from './student-list/student-list.component'
import { StudentDetailComponent } from './student-detail/student-detail.component';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule
  ]
})
export class StudentsModule { }
