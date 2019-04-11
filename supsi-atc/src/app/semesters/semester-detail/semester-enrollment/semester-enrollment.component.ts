import { Component, OnInit, Input } from '@angular/core';
import { Semester, StudyPlan, Module, StudentModule, Student } from 'src/app/ch.supsi';
import { SemestersService } from '../../semesters.service';
import { FormationsService } from 'src/app/formation/formations.service';
import { ModulesService } from 'src/app/modules/modules.service';
import { StudentsModule } from 'src/app/students/students.module';
import { StudentsService } from 'src/app/students/students.service';
import { loadLContextFromNode } from '@angular/core/src/render3/discovery_utils';

@Component({
  selector: 'app-semester-enrollment',
  templateUrl: './semester-enrollment.component.html',
  styleUrls: ['./semester-enrollment.component.css']
})
export class SemesterEnrollmentComponent implements OnInit {

  @Input() semesterChild: Semester;     //This element comes from the semester-detail component, it is the selected semester
  @Input() formationSelected: string;   //This is the formation selected to filter the module list and the student list to add, it is the filter
  @Input() formationSelected2: string;
  private studyPlanList: {} = {};       //This is the formation (StudyPlan) list -> DTI, DEAS , it is filled in the ngOnInit() method
  private semesterModules: {} = {};    //This is the module list contained in the semester
  private moduleAll: {};              //This list contains all the modules, is filled when in the page I click the button "Aggiungi modulo"
  private moduleSelected: string;
  private studentAll: {};
  private semesterStudents: {};


  constructor(
    private semestersService: SemestersService,
    private formationsService: FormationsService,
    private modulesService: ModulesService,
    private studentsService: StudentsService) { }


  ngOnInit() {
    //This fills the formation list, it make a request to API to receive the formations
    this.semestersService.getFormations().subscribe((res: StudyPlan[]) => {
      res.forEach(sp => { this.studyPlanList[sp.name] = sp.name; });
    });

    //This fills the module list contained in the semester, semesterChild has a StudentModule list not a Module list
    this.getListOfModule(this.semesterChild.modules);
  }

  /************************************ STUDENTS */
  mSelected(moduleSelected) {
    this.semesterStudents = {};
    this.moduleSelected = moduleSelected;

    this.semestersService.getStudentModule(moduleSelected).subscribe((res: StudentModule) => {
      res.students.forEach(element => {
        this.studentsService.getStudent(element.toString().split('#')[1]).subscribe((s: Student) => {
          this.semesterStudents[s.contactID] = s.name + " " + s.surname;
        });
      });
    });

  }

  //Method that is called when the button "AggiungiModulo" is pressed, fills the array with the list of all the module of the formation selected
  toListStudentAll() {
    this.studentAll = {};

    this.studentsService.getStudents().subscribe((res: Student[]) => {
      res.forEach(element => {
        //if(element.studyPlan == this.formationSelected2)
        this.studentAll[element.contactID.toString()] = element.name + " " + element.surname;
      });
    })
  }

  //Mehtod that adds a student to  a studentMoule
  addStudent(student) {
    var studentModule = {
      "$class": "ch.supsi.AddStudentToStudentModule",
      "student": "resource:ch.supsi.Student#" + student,
      "studentmodule": "resource:ch.supsi.StudentModule#" + this.moduleSelected
    }

    this.semestersService.addStudentToStudentModule(studentModule).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteStudent(student){
    var studentToDelete = {
      "$class": "ch.supsi.RemoveStudentFromStudentModule",
      "student": "resource:ch.supsi.Student#" + student,
      "studentmodule": "resource:ch.supsi.StudentModule#" + this.moduleSelected
    }

    this.semestersService.removeStudentFromStudentModule(studentToDelete).subscribe((result) => {
      window.location.reload();
    });
  }




  /************************************ MODULES */

  //Method that fills the module list with all module contained in the Semester.modules field (StudentModule)
  getListOfModule(studentModule: object[]) {
    if (studentModule) {
      studentModule.forEach(element => {
        var studentModule = element.toString().split('#')[1]; //I get only the id after #
        this.semestersService.getStudentModule(studentModule).subscribe((res: StudentModule) => { //All student module of this semester
          this.modulesService.getModule(res.module.toString().split('#')[1]).subscribe((resm: Module) => { //All module of the student module of this semester
            this.semesterModules[studentModule] = resm.name;
          });
        });
      });
    }
  }

  //Method that is called when the button "AggiungiModulo" is pressed, fills the array with the list of all the module of the formation selected
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

  //Mehtod that creates a studentMoule and adds this one in a semesters
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

  //Mehtod that removes a studentMoule from a semester
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