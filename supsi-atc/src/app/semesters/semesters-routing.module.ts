import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemesterListComponent } from './semester-list/semester-list.component';
import { SemesterDetailComponent } from './semester-detail/semester-detail.component';
import { SemesterNewComponent } from './semester-new/semester-new.component';

const routes: Routes = [
  {
    path: '',
    component: SemesterListComponent,
    children: [
       {
         path: 'new',
         component: SemesterNewComponent
       },
       {
         path: ':id',
         component: SemesterDetailComponent,
       }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemestersRoutingModule { }
