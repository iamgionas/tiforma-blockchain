import { Component, OnInit, Input } from '@angular/core';
import { Module, Department, Course } from 'src/app/ch.supsi';
import { ActivatedRoute, Router } from '@angular/router';
import { ModulesService } from '../modules.service';
import { CoursesService } from 'src/app/courses/courses.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {

  private module: Module;
  private departmentList: {};       //Object list -> key: dept.name value: "resource:ch.supsi.Department#" + dept.name
  private courseListAll: Course[];  //All Courses without module courses
  private courseList: Course[];     //Module courses

  @Input() moduleData: any = {
    $class: 'ch.supsi.UpdateModule',
    oldModule: 'resource:ch.supsi.Module#',
    name: '',
    duration: '',
    ETCS: '',
    department: '',
    state: '',
    responsables: [],
    englishName: '',
    comment: '',
    courses: []
  };

  private moduleDataToDelete = {
    $class: "ch.supsi.DeleteModule",
    module: "resource:ch.supsi.Module#"
  }

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {

    /*THIS MANAGE THE DEMPARTEMENT SELECT LIST
      I call the service to get the list of all Departement, this return a list of Departement object
      but we want the string -> "resource:ch.supsi.Departement#" + departement name to insert in the
      Moduel object because is a relational object. We have a list of string -> departmentList to which 
      we insert the desired built string -> key: dept.name value: "resource:ch.supsi.Department#" + dept.name
      In HTML FILE:
        <option *ngFor="let d of departmentList | keyvalue" [ngValue]="d.value">{{d.key}}</option>
    */
    this.departmentList = {};
    this.modulesService.getDepartments().subscribe((res: Department[]) => {
      res.forEach(dept => {
        this.departmentList[dept.name] = ("resource:ch.supsi.Department#" + dept.name);
      });
    });

    this.route.params.subscribe((params: any) => {
      if (params.id) {
        /*THIS MANAGE THE MODULE DATA*/
        this.modulesService.getModule(this.route.snapshot.params['id']).subscribe((data: Module) => {
          this.courseList = [];
          this.module = data;

          this.moduleData.oldModule += this.route.snapshot.params['id'];
          this.moduleData.name = this.module.name;
          this.moduleData.duration = this.module.duration;
          this.moduleData.ETCS = this.module.ETCS;
          this.moduleData.department = this.module.department;
          this.moduleData.state = this.module.state;
          this.moduleData.comment = this.module.comment;
          this.moduleData.responsables = this.module.responsables;

          this.toListOfCourse(this.module, this.module.courses);
          this.toListOfCourseAll();

          this.moduleDataToDelete.module += this.route.snapshot.params['id'];
        });
      }
    })
  }

  /*THIS ASYNC FUNCTION FILL THE LIST WITH THE COURSE FROM THE STRING LIST COURSE MODULE */
  toListOfCourse(module: Module, courses: Course[]) {
    if (courses) {
      courses.forEach(element => {
        this.coursesService.getCourse(element.toString().split('#')[1]).subscribe((res: Course) => {
          if (module === this.module) {
            this.courseList.push(res);
          }
        });
      });
    }
  }

  toListOfCourseAll() {
    this.courseListAll = [];
    this.coursesService.getCourses().subscribe((res: Course[]) => {
      res.forEach(element => {
        let toAdd = true;
        for (let i = 0; i < this.courseList.length; i++) {
          if (element.courseCode === this.courseList[i].courseCode) {
            toAdd = false;
          }
        }
        if (toAdd) {
          this.courseListAll.push(element);
        }
      })
    });
  }

  updateModule() {
    this.courseList.forEach(element => {
      var str = "resource:ch.supsi.Course#";
      this.moduleData.courses.push(str + element.courseCode);
    });
    console.log(this.moduleData);
    this.modulesService.updateModule(this.moduleData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteModule() {
    this.modulesService.deleteModule(this.moduleDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteCourse(id) {
    var data = {
      "$class": "ch.supsi.RemoveCourseFromModule",
      "course": "resource:ch.supsi.Course#" + id,
      "module": "resource:ch.supsi.Module#" + this.module.moduleCode,
    };

    this.modulesService.deleteCourse(data).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });

  }

  addCourse(course: Course) {
    console.log(course);
    var data = {
      "$class": "ch.supsi.AddCourseToModule",
      "course": "resource:ch.supsi.Course#" + course.courseCode,
      "module": "resource:ch.supsi.Module#" + this.module.moduleCode,
    }

    this.modulesService.addCourse(data).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });

  }

}