import { Component, OnInit } from '@angular/core';
import { Semester } from 'src/app/ch.supsi';
import { SemestersService } from '../semesters.service';

@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css']
})
export class SemesterListComponent implements OnInit {

  private semesters: Semester[] = [];

  constructor(private semestersService: SemestersService) { }

  ngOnInit() {
    this.semestersService.getSemesters().subscribe((res: Semester[]) => {
      this.semesters = res;
    });
  }

}
