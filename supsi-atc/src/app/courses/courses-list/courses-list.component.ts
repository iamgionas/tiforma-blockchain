import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  constructor(private rest : RestService) { }

  ngOnInit() {
    this.getCourses();
  }

  private getCourses(){
    this.rest.getAll('Courses').subscribe(cs => this.courses = cs);
  }

  courses : any[];
}