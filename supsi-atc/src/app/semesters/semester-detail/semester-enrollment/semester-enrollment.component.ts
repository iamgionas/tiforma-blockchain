import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Semester, StudyPlan, Module, StudentModule, Student } from 'src/app/ch.supsi';
import { SemestersService } from '../../semesters.service';
import { FormationsService } from 'src/app/formation/formations.service';
import { ModulesService } from 'src/app/modules/modules.service';
import { StudentsService } from 'src/app/students/students.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-semester-enrollment',
  templateUrl: './semester-enrollment.component.html',
  styleUrls: ['./semester-enrollment.component.css']
})
export class SemesterEnrollmentComponent implements OnInit {

  @Input() semesterChild: Semester;

  //@Input() semesterChild: Semester;     //Questo elemento proviene dal semester-detail component, è il semestre selezionato
  
  @Input() formationSelected: string;   //Questo è la formazione selezionata per filitrare la lista dei moduli
  @Input() formationSelected2: string;
  private studyPlanList: {} = {};       //Questo è un oggetto che rappresenta la lista delle formazioni
  private semesterModules: {} = {};     //Questo è un oggetto che rappresenta la lista dei moduli semestri
  private moduleAll: {};                //Questo è un oggetto che rappresenta la lista di tutti i moduli
  private moduleSelected: string;       //Questo è un elemento che seleziona il moduli per poi inserire gli studenti
  private moduleName: string;
  private studentAll: {};               //Questo è un oggetto che rappresenta la lista di tutti gli studenti
  private semesterStudents: {};         //Questo è un oggetto che rappresenta la lista dei studenti semestri
  private loading: boolean;


  constructor(
    private semestersService: SemestersService,
    private formationsService: FormationsService,
    private modulesService: ModulesService,
    private studentsService: StudentsService) { }

    ngOnChanges(changes: SimpleChanges) {
      //const name: SimpleChange = changes.semesterChild;
      /*console.log('prev value: ', semesterChild.previousValue);
      console.log('got name: ', semesterChild.currentValue);
      this.semesterChild = name.currentValue.toUpperCase();*/
      this.semesterChild = changes.semesterChild.currentValue;
      this.ngOnInit();
    }

  ngOnInit() {
        this.studyPlanList = {};  
        this.semesterModules = {};
        this.semesterStudents = {};
        this.loading = false;
        //Questo riempie la lista delle formazioni
        this.semestersService.getFormations().subscribe((res: StudyPlan[]) => {
          res.forEach(sp => { this.studyPlanList[sp.name] = sp.name; });
        });

        //Questo riempie la lista dei moduli contenuti nei semestri, semesterChild has a StudentModule list not a Module list
        this.getListOfModule(this.semesterChild.modules);
  }

  /************************************ STUDENTI */
  mSelected(moduleSelected, mudoleName) {
    this.moduleName = mudoleName;
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

  //Bottone "AggiungiModulo" -> riempie l'array con tutti gli studenti
  toListStudentAll() {
    this.studentAll = {};

    this.studentsService.getStudents().subscribe((res: Student[]) => {
      res.forEach(element => {
        //if(element.studyPlan == this.formationSelected2)
        this.studentAll[element.contactID.toString()] = element.name + " " + element.surname;
      });
    })
  }

  //Metodo che aggiunge lo studentente allo student module
  addStudent(student) {
    this.loading = true;
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

  //Metodo che elimina uno studente dallo student module
  deleteStudent(student) {
    this.loading = true;
    var studentToDelete = {
      "$class": "ch.supsi.RemoveStudentFromStudentModule",
      "student": "resource:ch.supsi.Student#" + student,
      "studentmodule": "resource:ch.supsi.StudentModule#" + this.moduleSelected
    }

    this.semestersService.removeStudentFromStudentModule(studentToDelete).subscribe((result) => {
      window.location.reload();
    });
  }




  /************************************ Moduli */

  //Metodo che riempie la lista dei moduli con tutti i moduli contenuti nel semestre
  getListOfModule(studentModule: object[]) {
    if (studentModule) {
      studentModule.forEach(element => {
        var studentModule = element.toString().split('#')[1]; //Prendo solo l'id dopo il #
        this.semestersService.getStudentModule(studentModule).subscribe((res: StudentModule) => { //Tutti gli studenti moduli del semestre
          this.modulesService.getModule(res.module.toString().split('#')[1]).subscribe((resm: Module) => { //Tutti i moduli dello student module del semestre
            this.semesterModules[studentModule] = resm.name;
          });
        });
      });
    }
  }

  //Bottone "AggiungiModulo", riempie l'array con la lista di tutti i moduli 
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

  //Metodo che crea e aggiungi uno studentModule e lo aggiunge al semestre 
  addModule(module) {
    this.loading = true;
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

  //Metodo che rimuove uno studentemodule dal semestre
  deleteModule(module) {
    this.loading = true;
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