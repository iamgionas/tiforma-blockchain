import { Component, OnInit, Input } from '@angular/core';
import { SemestersService } from '../semesters.service';

@Component({
  selector: 'app-semester-new',
  templateUrl: './semester-new.component.html',
  styleUrls: ['./semester-new.component.css']
})
export class SemesterNewComponent implements OnInit {

  private loading: boolean;

  @Input() semesterData: any = {
    $class: 'ch.supsi.CreateSemester',
    name: '',
    description: '',
    modules: []
  };

  constructor(private semestersService: SemestersService) { }

  ngOnInit() {
    this.loading = false;
  }

  createSemester() {
    this.loading = true;
    this.semestersService.createSemester(this.semesterData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
