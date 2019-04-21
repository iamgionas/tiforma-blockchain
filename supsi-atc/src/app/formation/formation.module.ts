import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { FormationRoutingModule } from './formation-routing.module';
import { FormationListComponent } from './formation-list/formation-list.component';
import { FormationDetailComponent } from './formation-detail/formation-detail.component';
import { FormationNewComponent } from './formation-new/formation-new.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [FormationListComponent, FormationDetailComponent, FormationNewComponent],
  imports: [
    CommonModule,
    FormationRoutingModule,
    FormsModule,
    LoadingModule
  ]
})
export class FormationModule { }
