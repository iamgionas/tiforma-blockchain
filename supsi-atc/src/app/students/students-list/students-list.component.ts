import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students: any = [];

  constructor(public rest: RestService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): any {
    this.rest.getAlls('Student').subscribe((data: {}) => {
      console.log(data);
      this.students = data;
    });
  }

}
