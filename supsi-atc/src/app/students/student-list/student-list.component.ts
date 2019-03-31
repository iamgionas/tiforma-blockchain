import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/ch.supsi';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  private students : Student[]  = [];
  constructor(private studentsService : StudentsService) { }

  ngOnInit() {
    this.studentsService.getStudents().subscribe((res : Student[])=>{
      this.students = res;
  });
  }
}
