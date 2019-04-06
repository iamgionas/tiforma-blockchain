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

  private department: Department;

  @Input() departmentData: any = {
    $class: 'ch.supsi.UpdateDepartment',
    oldDepartment: 'resource:ch.supsi.Department#',
    name: ''
  };

  private departmentDataToDelete = {
    $class: 'ch.supsi.DeleteDepartment',
    department: 'resource:ch.supsi.Department#'
  }

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.departmentsService.getDepartment(this.route.snapshot.params['id']).subscribe((data: Department) => {
          this.department = data;

          this.departmentData.oldDepartment += this.route.snapshot.params['id'];
          this.departmentData.name = this.department.name;

          this.departmentDataToDelete.department += this.route.snapshot.params['id'];
        });
      }
    })
  }

  updateDepartment() {
    this.departmentsService.updateDepartment(this.departmentData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteDepartment() {
    this.departmentsService.deleteDepartment(this.departmentDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
