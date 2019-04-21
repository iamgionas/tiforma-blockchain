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
  private loading: boolean;

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
    this.loading = false;
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
    this.loading = true;
    this.coursesService.updateCourse(this.courseData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteCourse() {
    this.loading = true;
    this.coursesService.deleteCourse(this.courseDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  printDetail() : void{
    let printContents, popupWin;
    let buttonGroup = document.querySelector('#btn-group');

    document.querySelector('#name').setAttribute('value',this.course.name);
    document.querySelector('#courseCode').setAttribute('value', this.course.courseCode);
    
    printContents = document.querySelector('#courseDetail');
    printContents.removeChild(buttonGroup);
    printContents = printContents.innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();

    window.location.reload();
  }
}