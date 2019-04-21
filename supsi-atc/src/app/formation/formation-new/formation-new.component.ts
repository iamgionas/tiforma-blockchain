import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationsService } from '../formations.service';
import { Department } from 'src/app/ch.supsi';

@Component({
  selector: 'app-formation-new',
  templateUrl: './formation-new.component.html',
  styleUrls: ['./formation-new.component.css']
})
export class FormationNewComponent implements OnInit {

  private departmentList: {};
  private loading: boolean;

  @Input() formationData: any = {
    $class: 'ch.supsi.CreateStudyPlan',
    name: '',
    department: '',
    state: '',
    comment: '',
    modules: [],
  };

  constructor(
    private route: ActivatedRoute,
    private formationsService: FormationsService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.departmentList = {};
    this.formationsService.getDepartments().subscribe((res: Department[]) => {
      res.forEach(dept => {
        this.departmentList[dept.name] = ("resource:ch.supsi.Department#" + dept.name);
      });

    });
  }

  createStudyPlan() {
    this.loading = true;
    //this.formationData.studyPlanID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);   StudyPlan still has no ID.
    console.log(this.formationData);
    this.formationsService.createStudyPlan(this.formationData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
