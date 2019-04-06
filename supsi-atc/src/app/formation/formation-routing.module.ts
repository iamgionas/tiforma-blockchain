import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FormationListComponent} from './formation-list/formation-list.component';
import {FormationDetailComponent} from './formation-detail/formation-detail.component';
import {FormationNewComponent} from './formation-new/formation-new.component';

const routes: Routes = [
  {
    path: '',
    component: FormationListComponent,
    children: [
      {
        path: 'new',
        component: FormationNewComponent
      },
      {
        path: ':id',
        component: FormationDetailComponent,
      }
      ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormationRoutingModule { }
