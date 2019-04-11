import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CertificationsRoutingModule } from './certifications-routing.module';
import { CertificationListComponent } from './certification-list/certification-list.component';
import { CertificationDetailComponent } from './certification-detail/certification-detail.component';
import { CertificationNewComponent } from './certification-new/certification-new.component';

@NgModule({
  declarations: [CertificationListComponent, CertificationDetailComponent, CertificationNewComponent],
  imports: [
    CommonModule,
    CertificationsRoutingModule,
    FormsModule
  ]
})
export class CertificationsModule { }
