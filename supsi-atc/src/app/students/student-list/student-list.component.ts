import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/ch.supsi';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  // Lista di oggeti Studenti -> per gestire la colonna lista di sinistra nell'HTML
  private students: Student[] = [];

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    // Richiesta rest asincrona per creare la lista degli studenti -> per gestire la lista a sinistra nell'HTML
    this.studentsService.getStudents().subscribe((res: Student[]) => {
      this.students = res;
    });
  }
}
