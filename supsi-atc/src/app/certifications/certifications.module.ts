import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CertificationsRoutingModule } from './certifications-routing.module';
import { CertificationListComponent } from './certification-list/certification-list.component';
import { CertificationDetailComponent } from './certification-detail/certification-detail.component';
import { CertificationNewComponent } from './certification-new/certification-new.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [CertificationListComponent, CertificationDetailComponent, CertificationNewComponent],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    FormsModule,
    LoadingModule
  ]
})
export class CertificationsModule { }
