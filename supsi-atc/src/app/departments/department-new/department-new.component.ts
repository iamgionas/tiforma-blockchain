import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-department-new',
  templateUrl: './department-new.component.html',
  styleUrls: ['./department-new.component.css']
})
export class DepartmentNewComponent implements OnInit {

  private loading: boolean;

  @Input() departmentData: any = {
    $class: 'ch.supsi.CreateDepartment',
    departmentID: '',
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService) { }

  ngOnInit() {
    this.loading = false;
  }

  createDepartment() {
    this.loading = true;
    this.departmentData.departmentID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.departmentsService.createDepartment(this.departmentData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
