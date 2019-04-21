import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { FormsModule } from '@angular/forms';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';
import { ModuleNewComponent } from './module-new/module-new.component';
import { LoadingModule } from '../loading/loading.module';

@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleDetailComponent,
    ModuleNewComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    FormsModule,
    LoadingModule
  ]
})
export class ModulesModule { }
