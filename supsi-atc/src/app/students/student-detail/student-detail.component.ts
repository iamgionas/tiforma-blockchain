import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/ch.supsi';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  private student: Student;
  private birthday: string;

  statuteValues = [
    "Mai immatricolato",
    "Immatricolato",
    "Exmatricolato",
    "Ospite"
  ]

  @Input() studentData: any = {
    $class: 'ch.supsi.Student',
    statute: '',
    serialNumber: '',
    name: '',
    surname: '',
    birthday: '',
    nationality: '',
    comment: '',
    studyPlan: 'resource:ch.supsi.StudyPlan#NULL'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((parms: any) => {
      if (parms.id) {
        this.studentsService.getStudent(this.route.snapshot.params['id']).subscribe((data: Student) => {
          console.log(data);
          this.student = data;

          this.studentData.statute = this.student["statute"];
          this.studentData.serialNumber = this.student["serialNumber"];
          this.studentData.name = this.student["name"];
          this.studentData.surname = this.student["surname"];
          this.studentData.birthday = new Date(this.student["birthday"]);
          this.studentData.nationality = this.student["nationality"];
          this.studentData.comment = this.student["comment"];
        });
      }
    });
  }

  updateStudent() {
    this.studentData.birthday = new Date(this.birthday);
    
    this.studentsService.updateStudent(this.route.snapshot.params['id'], this.studentData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteStudent() {
    this.studentsService.deleteStudent(this.route.snapshot.params['id']).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  updateData(event){
    this.birthday = event;
  }

}
