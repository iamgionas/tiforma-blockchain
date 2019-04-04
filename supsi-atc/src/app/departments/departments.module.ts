import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentNewComponent } from './department-new/department-new.component';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DepartmentListComponent, 
    DepartmentDetailComponent, 
    DepartmentNewComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    FormsModule
  ]
})
export class DepartmentsModule { }
