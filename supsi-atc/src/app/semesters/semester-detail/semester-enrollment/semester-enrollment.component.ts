import { Component, OnInit, Input } from '@angular/core';
import { Semester, StudyPlan, Module } from 'src/app/ch.supsi';
import { SemestersService } from '../../semesters.service';
import { FormationsService } from 'src/app/formation/formations.service';
import { ModulesService } from 'src/app/modules/modules.service';

@Component({
  selector: 'app-semester-enrollment',
  templateUrl: './semester-enrollment.component.html',
  styleUrls: ['./semester-enrollment.component.css']
})
export class SemesterEnrollmentComponent implements OnInit {

  @Input() semesterChild: Semester;
  @Input() formationSelected: string;
  private studyPlanList: {} = {};
  private moduleAll: string[];
  private semesterModules: string[];

  constructor(
    private semestersService: SemestersService,
    private formationsService: FormationsService,
    private modulesService: ModulesService) { }

  ngOnInit() {
    this.semestersService.getFormations().subscribe((res: StudyPlan[]) => {
      res.forEach(sp => {
        this.studyPlanList[sp.name] = sp.name;
      });
    });

    this.getListOfModule(this.semesterChild.modules);

  }

  getListOfModule(studentModules: object[]) {
    this.semesterModules = [];
    if (studentModules) {
      studentModules.forEach(element => {
        this.modulesService.getModule(element.toString().split('#')[1]).subscribe((res: Module) => {
          //this.semesterModules.push(res);
          console.log(res);
          
        });
      });
    }
  }

  toListModuleAll() {
    this.moduleAll = [];
    this.formationsService.getStudyPlan(this.formationSelected).subscribe((res: StudyPlan) => {
      res.modules.forEach(element => {
        this.moduleAll.push(element.toString().split("#")[1]);
      })
    });

  }

  addModule(module) {
    var studentModuleID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    var studentModule = {
      "$class": "ch.supsi.CreateStudentModule",
      "studentModuleID": studentModuleID.toString(),
      "module": "resource:ch.supsi.Module#" + module,
      "students": [
      ],
    }

    var studentModuleToSemester = {
      "$class": "ch.supsi.AddStudentModuleToSemester",
      "studentModule": "resource:ch.supsi.StudentModule#" + studentModuleID,
      "semester": "resource:ch.supsi.Semester#" + this.semesterChild.name,
    }

    this.semestersService.createStudentModule(studentModule).subscribe((result) => {
      this.semestersService.addStudentModuleToSemester(studentModuleToSemester).subscribe((result) => {
        window.location.reload();
      }, (err) => {
        console.log(err);
      });
    });
  }
}