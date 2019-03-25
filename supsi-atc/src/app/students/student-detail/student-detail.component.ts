import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  @Input() studentData: any = { serialNumber: '', statute: '', name: '', surname: '', birthday: '' };

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
        this.rest.getObject('Student', this.route.snapshot.params['id']).subscribe((data: {}) => {
          console.log(data);
          this.student = data;
        });
      }
    });
  }

  updateStudent() {
    this.rest.updateObject('Students', this.route.snapshot.params['id'], this.studentData).subscribe((result) => {
      this.router.navigate([result.contactID]);
    }, (err) => {
      console.log(err);
    });
  }

}
