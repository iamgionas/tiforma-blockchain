import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
    children: [
      {
        path: ':id',
        component: StudentDetailComponent,
      }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
