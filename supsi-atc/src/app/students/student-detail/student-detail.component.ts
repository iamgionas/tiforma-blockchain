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

  private loading: boolean;

  private statuteValues = [
    "Mai immatricolato",
    "Immatricolato",
    "Exmatricolato",
    "Ospite"
  ]

  @Input() studentData: any = {
    $class: 'ch.supsi.UpdateStudent',
    oldStudent: 'resource:ch.supsi.Student#',
    name: '',
    surname: '',
    birthday: '',
    nationality: '',
    statute: '',
    serialNumber: '',
    comment: '',
    studyPlan: 'resource:ch.supsi.StudyPlan#NULL'
  };

  private studentDataToDelete = {
    $class: "ch.supsi.DeleteStudent",
    student: "resource:ch.supsi.Student#"
  }

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.route.params.subscribe((parms: any) => {
      if (parms.id) {
        this.studentsService.getStudent(this.route.snapshot.params['id']).subscribe((data: Student) => {
          this.student = data;

          this.studentData.oldStudent += this.route.snapshot.params['id'];
          this.studentData.name = this.student.name;
          this.studentData.surname = this.student.surname;
          this.studentData.birthday = this.student.birthday;  //new Date()
          this.studentData.nationality = this.student.nationality;
          this.studentData.statute = this.student.statute;
          this.studentData.serialNumber = this.student.serialNumber;
          this.studentData.comment = this.student.comment;

          this.studentDataToDelete.student += this.route.snapshot.params['id'];
          
          console.log(this.student.birthday);
        });
      }
    });
  }

  updateStudent() {
    this.loading = true;
    this.studentsService.updateStudent(this.studentData).subscribe((result) => {
      
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteStudent() {
    this.loading = true;
    this.studentsService.deleteStudent(this.studentDataToDelete).subscribe((result) => {
      
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  setBirthday(event){
    this.studentData.birthday = $("#birthday").val();
  }

  printDetail(): void {
    let printContents, popupWin;
    let buttonGroup = document.querySelector('#buttonGroup');

    let nationalityOption = document.createElement('option');
    nationalityOption.setAttribute('selected','selected');
    nationalityOption.setAttribute('value',this.student.nationality);
    nationalityOption.innerHTML = this.student.nationality;

    document.querySelector('#serialNumber').setAttribute('value',this.student.serialNumber);
    document.querySelector('#statute').setAttribute('value',this.student.statute);
    document.querySelector('#name').setAttribute('value',this.student.name);
    document.querySelector('#surname').setAttribute('value',this.student.surname);
    document.querySelector('#nationality').appendChild(nationalityOption);
    document.querySelector('#birthday').setAttribute('value', this.formatDate());
    document.querySelector('#comment').innerHTML =  this.student.comment;
    
    
    printContents = document.getElementById('studentDetail');
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

  private formatDate() : string{
    let date = this.student.birthday.toString().split('T')[0];
    let day = date.split('-')[2];
    let month = date.split('-')[1];
    let year = date.split('-')[0];

    return year+"-"+month+"-"+day;
  }
}
