import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../students.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.css']
})
export class StudentNewComponent implements OnInit {

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

  }

  createStudent(){
    this.studentData.contactID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    console.log(Date.parse(this.studentData.birthday));
    
    this.studentsService.createStudent(this.studentData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }


}
