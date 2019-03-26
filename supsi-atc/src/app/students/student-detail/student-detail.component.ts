import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  @Input() studentData: any = { 
    $class: 'ch.supsi.Student', 
    statute: '', 
    serialNumber: '',
    name: '', 
    surname: '', 
    birthday: '',
    nationality: '',
    comment: '' };

  obj: String = 'Student';
  student: any;
  statuteValues = [
    "Mai immatricolato",
    "Immatricolato",
    "Exmatricolato",
    "Ospite"
  ]

  constructor(private route: ActivatedRoute, public rest: RestService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((parms: any) => {
      if (parms.id) {
        this.rest.getObject(this.obj, this.route.snapshot.params['id']).subscribe((data: {}) => {
          console.log(data);
          this.student = data;

          this.studentData.serialNumber = this.student["serialNumber"];
          this.studentData.statute = this.student["statute"];
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
    this.rest.updateObject(this.obj, this.route.snapshot.params['id'], this.studentData).subscribe((result) => {
      //this.router.navigate(["/"]);
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteStudent(){
    this.rest.deleteObject(this.obj, this.route.snapshot.params['id']).subscribe((result) => {
      //this.router.navigate(["/"]);
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
    
  }

}
