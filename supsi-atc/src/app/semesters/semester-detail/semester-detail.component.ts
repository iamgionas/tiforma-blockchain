import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SemestersService } from '../semesters.service';
import { Semester } from 'src/app/ch.supsi';

@Component({
  selector: 'app-semester-detail',
  templateUrl: './semester-detail.component.html',
  styleUrls: ['./semester-detail.component.css']
})
export class SemesterDetailComponent implements OnInit {

  public semester: Semester;
  semesterToChild = this.route.snapshot.params['id'].toString();

  @Input() semesterData: any = {
    $class: 'ch.supsi.UpdateSemester',
    oldSemester: 'resource:ch.supsi.Semester#',
    description: '',
    modules: []
  };

  private semesterDataToDelete = {
    $class: "ch.supsi.DeleteSemester",
    semester: "resource:ch.supsi.Semester#"
  }

  constructor(
    private route: ActivatedRoute,
    private semestersService: SemestersService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.semestersService.getSemester(this.route.snapshot.params['id']).subscribe((data: Semester) => {
          this.semester = data;
          
          this.semesterData.oldSemester += this.route.snapshot.params['id'];
          this.semesterData.description = this.semester.description;
          this.semesterData.modules = this.semester.modules;

          this.semesterDataToDelete.semester += this.route.snapshot.params['id'];
        });
      }
    })
  }

  updateSemester() {
    this.semestersService.updateSemester(this.semesterData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteSemester() {
    this.semestersService.deleteSemester(this.semesterDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  printDetail() : void{
    let printContents, popupWin;
    
    let buttonGroup = document.querySelector('#btn-group');
    buttonGroup.remove();

    document.querySelector('#semesterCode').setAttribute('value', this.semester.name);
    document.querySelector('#description').setAttribute('value', this.semester.description);

    printContents = document.querySelector('#semesterDetail');
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
