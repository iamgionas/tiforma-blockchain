import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent,
    children: [
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
