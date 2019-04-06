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
    $class: 'ch.supsi.UpdateCourse',
    oldCourse: 'resource:ch.supsi.Course#',
    name: ''
  };

  private courseDataToDelete = {
    $class: "ch.supsi.DeleteCourse",
    course: "resource:ch.supsi.Course#"
  }

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.coursesService.getCourse(this.route.snapshot.params['id']).subscribe((data: Course) => {
          this.course = data;
          
          this.courseData.oldCourse += this.route.snapshot.params['id'];
          this.courseData.name = this.course.name;

          this.courseDataToDelete.course += this.route.snapshot.params['id'];
        });
      }
    })
  }

  updateCourse() {
    this.coursesService.updateCourse(this.courseData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteCourse() {
    this.coursesService.deleteCourse(this.courseDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }
}