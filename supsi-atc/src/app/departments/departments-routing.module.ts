import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentNewComponent } from './department-new/department-new.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
    children: [
      {
        path: 'new',
        component: DepartmentNewComponent
      },
      {
        path: ':id',
        component: DepartmentDetailComponent,
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
