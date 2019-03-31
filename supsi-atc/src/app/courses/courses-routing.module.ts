import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesNewComponent } from './courses-new/courses-new.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
    children: [
      {
        path: 'new',
        component: CoursesNewComponent,
      },
      {
        path: ':id',
        component: CoursesDetailComponent,
      }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
