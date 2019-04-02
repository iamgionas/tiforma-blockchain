import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesRoutingModule } from './modules-routing.module';
import { FormsModule } from '@angular/forms';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';

@NgModule({
  declarations: [
    ModuleListComponent,
    ModuleDetailComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    FormsModule
  ]
})
export class ModulesModule { }
