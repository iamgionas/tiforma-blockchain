import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css']
})
export class CoursesDetailComponent implements OnInit {

  @Input() courseData: any = { courseCode: '', name: ''};

  constructor(private rest : RestService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.route.params.subscribe((params : any) => {
      if(params.id){
        this.rest.getObject('Courses',params.id).subscribe((c) => this.course = c);
      }
    })
  }

  course : any;

  modifyCourse(){
    this.rest.updateObject('Courses', this.route.snapshot.params['id'], this.courseData).subscribe((result) => {
      this.router.navigate([result.courseCode]);
    }, (err) => {
      console.log(err);
    });
  }
}