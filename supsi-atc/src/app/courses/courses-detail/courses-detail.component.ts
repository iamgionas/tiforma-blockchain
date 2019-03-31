import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../courses.service';
import { Course } from 'src/app/ch.supsi';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css']
})
export class CoursesDetailComponent implements OnInit {

  private course: Course;

  @Input() courseData: any = {
    $class: 'ch.supsi.Course',
    courseCode: '',
    name: ''
  };

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.coursesService.getCourse(this.route.snapshot.params['id']).subscribe((data: Course) => {
          console.log(data);
          this.course = data;

          this.courseData.courseCode = this.course.courseCode;
          this.courseData.name = this.course.name;
        });
      }
    })
  }

  updateCourse() {
    this.coursesService.updateCourse(this.route.snapshot.params['id'], this.courseData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteCourse() {
    this.coursesService.deleteCourse(this.route.snapshot.params['id']).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }
}