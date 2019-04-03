import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';
import { ModuleNewComponent } from './module-new/module-new.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleListComponent,
    children: [
      {
        path: 'new',
        component: ModuleNewComponent
      },
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
