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
  private loading: boolean;


  private formationDataToDelete = {
    $class: "ch.supsi.DeleteStudyPlan",
    studyplan: 'resource:ch.supsi.StudyPlan#'
  }

  @Input() formationData: any = {
    $class: 'ch.supsi.UpdateStudyPlan',
    oldStudyPlan: 'resource:ch.supsi.StudyPlan#',
    department: '',
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
    this.loading = false;
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
          
          this.formationData.oldStudyPlan = 'resource:ch.supsi.StudyPlan#' + params.id;
          this.formationData.department = this.studyPlan.department;
          this.formationData.state = this.studyPlan.state;
          this.formationData.comment = this.studyPlan.comment;
          this.formationData.modules = this.studyPlan.modules;

          this.toListOfModule(this.studyPlan, this.studyPlan.modules);
          this.toListOfModuleAll();

          this.formationDataToDelete.studyplan += params.id;
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
    this.loading = true;
    this.formationData.modules = [];
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
    this.loading = true;
    console.log(this.formationDataToDelete);
    
    this.formationService.deleteStudyPlan(this.formationDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteModule(id) {
    this.loading = true;
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
    this.loading = true;
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

  printDetail() : void{
    let printContents, popupWin;
    let buttonGroup = document.querySelector('#btn-group');

    document.querySelector('#department').setAttribute('value', this.studyPlan.department.name);
    document.querySelector('#state').setAttribute('value', this.studyPlan.state);
    document.querySelector('#comment').setAttribute('value', this.studyPlan.comment);

    document.getElementById('addModule').parentNode.removeChild(document.getElementById('addModule'));

    let allAs = document.querySelectorAll("#moduleDeletionLink");

    for(let i = 0; i<allAs.length ; i++){
      allAs.item(i).parentNode.removeChild(allAs[i]);
    }

    buttonGroup.remove();

    printContents = document.querySelector('#formationDetail');
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