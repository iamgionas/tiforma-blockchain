import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSearchComponent } from './main-search/main-search.component';

const routes: Routes = [
  {
    path: '',
    component: MainSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueriesRoutingModule { }
