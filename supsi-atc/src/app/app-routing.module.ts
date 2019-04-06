import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', loadChildren: './students/students.module#StudentsModule' },
  { path: 'departments', loadChildren: './departments/departments.module#DepartmentsModule' },
  { path: 'courses', loadChildren: './courses/courses.module#CoursesModule' },
  { path: 'modules', loadChildren: './modules/modules.module#ModulesModule' },
  { path: 'search', loadChildren: './queries/queries.module#QueriesModule'},
  { path: 'formations', loadChildren: './formation/formation.module#FormationModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }