import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentsListComponent } from './students-list/students-list.component';
import {StudentFormComponent} from './student-form/student-form.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsListComponent,
    children: [
      {
        path: ':id',
        component: StudentDetailComponent,
      },
      {
        path: ':create',
        component: StudentFormComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
