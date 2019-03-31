import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { FormsModule } from '@angular/forms';
import { CoursesNewComponent } from './courses-new/courses-new.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CoursesDetailComponent,
    CoursesNewComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule
  ]
})
export class CoursesModule { }
