import { Component, OnInit, Input } from '@angular/core';
import { Semester, StudyPlan, Module, StudentModule } from 'src/app/ch.supsi';
import { SemestersService } from '../../semesters.service';
import { FormationsService } from 'src/app/formation/formations.service';
import { ModulesService } from 'src/app/modules/modules.service';
import { StudentsModule } from 'src/app/students/students.module';

@Component({
  selector: 'app-semester-enrollment',
  templateUrl: './semester-enrollment.component.html',
  styleUrls: ['./semester-enrollment.component.css']
})
export class SemesterEnrollmentComponent implements OnInit {

  @Input() semesterChild: Semester;     //This element comes from the semester-detail component, it is the selected semester
  @Input() formationSelected: string;   //This is the formation selected to filter the module list and the student list to add, it is the filter
  private studyPlanList: {} = {};       //This is the formation (StudyPlan) list -> DTI, DEAS , it is filled in the ngOnInit() method
  private semesterModules: {} = {};    //This is the module list contained in the semester
  private moduleAll: {};              //This list contains all the modules, is filled when in the page I click the button "Aggiungi modulo"


  constructor(
    private semestersService: SemestersService,
    private formationsService: FormationsService,
    private modulesService: ModulesService) { }

  ngOnInit() {
    //This fills the formation list, it make a request to API to receive the formations
    this.semestersService.getFormations().subscribe((res: StudyPlan[]) => {
      res.forEach(sp => { this.studyPlanList[sp.name] = sp.name; });
    });

    //This fills the module list contained in the semester, semesterChild has a StudentModule list not a Module list
    this.getListOfModule(this.semesterChild.modules);
  }

  //TODO: modificare questo metodo che usi una query per farsi ritornare tutti i moduli contenuti in un semestre
  getListOfModule(studentModule: object[]) {
    if (studentModule) {
      studentModule.forEach(element => {
        var studentModule = element.toString().split('#')[1];
        this.semestersService.getStudentModule(studentModule).subscribe((res: StudentModule) => {
          this.modulesService.getModule(res.module.toString().split('#')[1]).subscribe((resm: Module) => {
            this.semesterModules[studentModule] = resm.name;
          });
        });
      });
    }
  }

  //TODO: modifcare questo metodo che usi una query e ritorni i nomi dei moduli senza quelli contenuti nello studyplan
  toListModuleAll() {
    this.moduleAll = {};
    this.formationsService.getStudyPlan(this.formationSelected).subscribe((res: StudyPlan) => {
      res.modules.forEach(element => {
        this.modulesService.getModule(element.toString().split("#")[1]).subscribe((resm: Module) => {

          var toAdd = true;

          /*Object.keys(this.semesterModules).map(function(key) {
            if(this.semesterModules[key].toString() === resm.name.toString()){
              toAdd = false;
            }
          });*/
          
          if (toAdd) {
            this.moduleAll[element.toString().split("#")[1]] = resm.name;
          }
        });
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

  deleteModule(module) {
    var studentModuleToDelete = {
      "$class": "ch.supsi.RemoveStudentModuleFromSemester",
      "studentmodule": "resource:ch.supsi.StudentModule#" + module,
      "semester": "resource:ch.supsi.Semester#" + this.semesterChild.name,
    }


    this.semestersService.removeStudentModuleFromSemester(studentModuleToDelete).subscribe((result) => {
      window.location.reload();
    });

  }
}