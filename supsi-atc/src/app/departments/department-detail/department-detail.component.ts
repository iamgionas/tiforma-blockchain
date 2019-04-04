import { Component, OnInit, Input } from '@angular/core';
import { Department } from 'src/app/ch.supsi';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {

  private department : Department;

  @Input() departmentData: any = {
    $class: 'ch.supsi.Department',
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService
    ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.departmentsService.getDepartment(this.route.snapshot.params['id']).subscribe((data: Department) => {
          this.department = data;
          this.departmentData.name = this.department.name;
        });
      }
    })
  }

}
