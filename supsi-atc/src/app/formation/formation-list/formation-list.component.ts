import { Component, OnInit } from '@angular/core';
import { StudyPlan } from 'src/app/ch.supsi';
import { FormationsService } from '../formations.service'; 

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {


  private studyPlans : StudyPlan[] = [];

  constructor(private formationsService: FormationsService) { }

  ngOnInit() {
    this.formationsService.getStudyPlans().subscribe((res: StudyPlan[]) => {
      this.studyPlans = res;
    });
  }

}
