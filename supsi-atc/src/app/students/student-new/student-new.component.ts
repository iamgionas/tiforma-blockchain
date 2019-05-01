import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
import { DatePipe } from '@angular/common';
import { StudyPlan } from 'src/app/ch.supsi';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css']
})
export class StudentNewComponent implements OnInit {

  private loading: boolean;

  studyPlans : StudyPlan[] = [];

  statuteValues = [
    "Mai immatricolato",
    "Immatricolato",
    "Exmatricolato",
    "Ospite"
  ]

  @Input() studentData: any = {
    $class: 'ch.supsi.CreateStudent',
    contactID: '',
    statute: '',
    serialNumber: '',
    name: '',
    surname: '',
    birthday: '',
    nationality: '',
    comment: '',
    transactionId: '',
    studyPlan: 'resource:ch.supsi.StudyPlan#NULL',
  };

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService) { }

  ngOnInit() {
    this.loading = false;

    this.studentsService.getStudyPlans().subscribe((sp : StudyPlan[]) => {
      this.studyPlans = sp;
    });
  }

  createStudent(){
    this.studentData.contactID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.loading = true;
    this.studentsService.createStudent(this.studentData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }


}
