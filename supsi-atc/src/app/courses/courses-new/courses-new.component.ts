import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-new',
  templateUrl: './courses-new.component.html',
  styleUrls: ['./courses-new.component.css']
})
export class CoursesNewComponent implements OnInit {

  @Input() courseData: any = {
    $class: 'ch.supsi.CreateCourse',
    courseCode: '',
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit() {
  }

  createCourse() {
    this.courseData.courseCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.coursesService.createCourse(this.courseData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
