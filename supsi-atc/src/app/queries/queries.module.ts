import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueriesRoutingModule } from './queries-routing.module';
import { MainSearchComponent } from './main-search/main-search.component';

@NgModule({
  declarations: [MainSearchComponent],
  imports: [
    CommonModule,
    QueriesRoutingModule
  ]
})
export class QueriesModule { }
