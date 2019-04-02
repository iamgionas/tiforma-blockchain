import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleListComponent,
    children: [
      /*{
        path: 'new',
        component: StudentNewComponent
      },*/
      {
        path: ':id',
        component: ModuleDetailComponent,
      }
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
