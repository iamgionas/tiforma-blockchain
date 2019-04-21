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
  private loading: boolean;

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
    this.loading = false;
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
    this.loading = true;
    this.departmentsService.updateDepartment(this.departmentData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteDepartment() {
    this.loading = true;
    this.departmentsService.deleteDepartment(this.departmentDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  printDetail() : void{
    let printContents, popupWin;
    let buttonGroup = document.querySelector('#buttonGroup');

    document.querySelector('#depName').setAttribute('value',this.department.name);
    
    printContents = document.querySelector('#departmentDetail');
    printContents.removeChild(buttonGroup);
    printContents = printContents.innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();

    window.location.reload();
  }
}
