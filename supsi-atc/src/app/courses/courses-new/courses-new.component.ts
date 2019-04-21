import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-new',
  templateUrl: './courses-new.component.html',
  styleUrls: ['./courses-new.component.css']
})
export class CoursesNewComponent implements OnInit {

  private loading: boolean;

  @Input() courseData: any = {
    $class: 'ch.supsi.CreateCourse',
    courseCode: '',
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) { }

  ngOnInit() {
    this.loading = false;
  }

  createCourse() {
    this.loading = true;
    this.courseData.courseCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.coursesService.createCourse(this.courseData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
