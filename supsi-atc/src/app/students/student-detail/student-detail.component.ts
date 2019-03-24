import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  student: any;
  statuteValues = [
    "Mai immatricolato",
    "Immatricolato",
    "Exmatricolato",
    "Ospite"
  ]

  constructor(public rest: RestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.rest.getStudent(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.student = data;
    });
  }

}
