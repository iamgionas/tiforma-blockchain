import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/ch.supsi';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  private departments: Department[] = [];
  constructor(private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.departmentsService.getDepartments().subscribe((res: Department[]) => {
      this.departments = res;
    });
  }

}
