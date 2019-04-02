import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';

import * as $ from 'jquery';


@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  obj: String = 'Student';
  students: any = [];

  constructor(public rest: RestService) { 
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): any {
    this.rest.getAll(this.obj).subscribe((data: {}) => {
      console.log(data);
      this.students = data;
    });
  }

  getStudentsBySurname() : any{
    let surname = $("#studentSearch").val();
    if(surname === ""){
      this.getStudents();
    } else {
      this.rest.getStudentsBySurname(surname).subscribe((data : {}) =>{
        this.students = data;
      })
    }
  } 
}
