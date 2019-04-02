import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentDetailComponent } from './student-detail/student-detail.component';
<<<<<<< HEAD
import { StudentListComponent } from './student-list/student-list.component';
import { StudentNewComponent } from './student-new/student-new.component';
=======
import { StudentsListComponent } from './students-list/students-list.component';
import {StudentFormComponent} from './student-form/student-form.component';
>>>>>>> front-end-queries

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent,
    children: [
      {
        path: 'new',
        component: StudentNewComponent
      },
      {
        path: ':id',
        component: StudentDetailComponent,
<<<<<<< HEAD
      }
      ]
=======
      },
      {
        path: ':create',
        component: StudentFormComponent
      }
    ]
>>>>>>> front-end-queries
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
