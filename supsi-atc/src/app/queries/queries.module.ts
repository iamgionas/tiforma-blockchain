import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueriesRoutingModule } from './queries-routing.module';
import { MainSearchComponent } from './main-search/main-search.component';
import { FindDetailComponent } from './find-detail/find-detail.component';

@NgModule({
  declarations: [MainSearchComponent, FindDetailComponent],
  imports: [
    CommonModule,
    QueriesRoutingModule
  ]
})
export class QueriesModule { }
