import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSearchComponent } from './main-search/main-search.component';
import { FindDetailComponent } from './find-detail/find-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MainSearchComponent
  },
  {
    path: 'find',
    component: FindDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueriesRoutingModule { }
