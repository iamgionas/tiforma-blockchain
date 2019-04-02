import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', loadChildren: './students/students.module#StudentsModule' },
  { path: 'courses', loadChildren: './courses/courses.module#CoursesModule' },
  { path: 'modules', loadChildren: './modules/modules.module#ModulesModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }