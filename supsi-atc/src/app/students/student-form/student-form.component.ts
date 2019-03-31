import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  constructor(private rest : RestService) { }

  ngOnInit() {
    console.log("Student form");
  }

  private idCounter = Number;

  createStudent(){
    let student = null;
    this.rest.createStudent(student);
  }
}
