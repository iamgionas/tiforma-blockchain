import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Course } from 'src/app/ch.supsi';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  private courses: Course[] = [];
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.coursesService.getCourses().subscribe((res: Course[]) => {
      this.courses = res;
    });
  }
}