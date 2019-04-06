import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormationsService } from '../formations.service';
import { ModulesService } from 'src/app/modules/modules.service';
import { StudyPlan, Module, Department } from 'src/app/ch.supsi';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.css']
})
export class FormationDetailComponent implements OnInit {


  private studyPlan: StudyPlan;
  private departmentList: {};       //Object list -> key: dept.name value: "resource:ch.supsi.Department#" + dept.name
  private moduleListAll: Module[];  //All Courses without module courses
  private moduleList: Module[];     //Module courses


  private formationDataToDelete = {
    $class: "ch.supsi.DeleteStudyPlan",
    studyPlan: "resource:ch.supsi.StudyPlan#"
  }

  @Input() formationData: any = {
    $class: 'ch.supsi.UpdateStudyPlan',
    oldStudyPlan: 'resource:ch.supsi.StudyPlan#',
    departement: '',
    state: '',
    comment: '',
    modules: [],
  };

  constructor(
    private route: ActivatedRoute,
    private formationService: FormationsService,
    private modulesService: ModulesService
  ) { }

  ngOnInit() {
    this.departmentList = {};
    this.modulesService.getDepartments().subscribe((res: Department[]) => {
      res.forEach(dept => {
        this.departmentList[dept.name] = ("resource:ch.supsi.Department#" + dept.name);
      });
    });


    this.route.params.subscribe((params: any) => {
      if (params.id) {
        /*THIS MANAGES THE STUDYPLAN DATA*/
        this.formationService.getStudyPlan(this.route.snapshot.params['id']).subscribe((data: StudyPlan) => {
          this.moduleList = [];
          this.studyPlan = data;

          this.formationData.oldStudyPlan += this.route.snapshot.params['id'];
          this.formationData.departement = this.studyPlan.departement;
          this.formationData.state = this.studyPlan.state;
          this.formationData.comment = this.studyPlan.comment;
          this.formationData.modules = this.studyPlan.modules;

          this.toListOfModule(this.studyPlan, this.studyPlan.modules);
          this.toListOfModuleAll();

          this.formationDataToDelete.studyPlan += this.route.snapshot.params['id'];
        });
      }
    })
  }

  toListOfModule(studyPlan: StudyPlan, modules: Module[]) {
    if (modules) {
      modules.forEach(element => {
        this.modulesService.getModule(element.toString().split('#')[1]).subscribe((res: Module) => {
          if (studyPlan === this.studyPlan) {
            this.moduleList.push(res);
          }
        });
      });
    }
  }

  toListOfModuleAll() {
    this.moduleListAll = [];
    this.modulesService.getModules().subscribe((res: Module[]) => {
      res.forEach(element => {
        let toAdd = true;
        for (let i = 0; i < this.moduleList.length; i++) {
          if (element.moduleCode === this.moduleList[i].moduleCode) {
            toAdd = false;
          }
        }
        if (toAdd) {
          this.moduleListAll.push(element);
        }
      })
    });
  }




  updateStudyPlan() {
    this.moduleList.forEach(element => {
      var str = "resource:ch.supsi.Module#";
      this.formationData.modules.push(str + element.moduleCode);
    });
    console.log(this.formationData);
    this.formationService.updateStudyPlan(this.formationData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteStudyPlan() {
    this.formationService.deleteStudyPlan(this.formationDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteModule(id) {
    var data = {
      "$class": "ch.supsi.RemoveModuleFromStudyPlan",
      "module": "resource:ch.supsi.Module#" + id,
      "studyplan": "resource:ch.supsi.StudyPlan#" + this.studyPlan.name,
    };

    this.formationService.removeModule(data).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });

  }

  addModule(module: Module) {
    console.log(module);
    var data = {
      "$class": "ch.supsi.AddModuleToStudyPlan",
      "module": "resource:ch.supsi.Module#" + module.moduleCode,
      "studyplan": "resource:ch.supsi.StudyPlan#" + this.studyPlan.name,
    }

    this.formationService.addModule(data).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }
}