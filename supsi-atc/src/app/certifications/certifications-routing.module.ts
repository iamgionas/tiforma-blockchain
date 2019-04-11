import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CertificationListComponent } from './certification-list/certification-list.component';
import { CertificationNewComponent } from './certification-new/certification-new.component';
import { CertificationDetailComponent } from './certification-detail/certification-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CertificationListComponent,
    children: [
      {
        path: 'new',
        component: CertificationNewComponent,
      },
      {
        path: ':id',
        component: CertificationDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificationsRoutingModule { }
