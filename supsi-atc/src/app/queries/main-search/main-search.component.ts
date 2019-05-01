import { Component, OnInit } from '@angular/core';

import *  as $ from 'jquery';
import { RestService } from 'src/app/rest.service';
import { Student } from 'src/app/ch.supsi';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {

  constructor(private restService : RestService) { }

  ngOnInit() {
    this.getType();
    this.getFilter();
  }

  type : String;
  filter: String;
  searchValue: string;

  found : any = [];


  getType(){
    this.type = (String)($("#Type").val());
  }

  getFilter(){
    this.filter = (String)($("#Filter").val());
  }

  getSearchValue(){
    this.searchValue = (String)($("#searchValue").val());
  }

  find(){
    this.getType();
    this.getFilter();
    this.getSearchValue();
    
    console.log("Type: "+this.type+".\nFilter: "+this.filter+".\nSearch Value: "+this.searchValue+".");

    switch(this.type){
      case "Studenti": {
        switch(this.filter){
          case "Name":{
            this.findStudentsByName();
            break;
          }
          case "Surname":{
            this.findStudentsBySurname();
            break;
          }
          case "SerialNumber":{
            this.findStudentsBySerialNumber();
            break;
          }
        }
        break;
      }
      case "Dipartimenti": {
        switch(this.filter){
          case "Name":{
            this.findDepartmentByName();
            break;
          }
        }
        break;
      }
      case "Corsi": {
        switch(this.filter){
          case "Name":{
            this.findCoursesByName();
            break;
          }
          case "CourseCode":{
            this.findCoursesByCourseCode();
            break;
          }
        }
        break;
      }
      case "Moduli": {
        switch(this.filter){
          case "Name":{
            this.findModulesByName();
            break;
          }
          case "ModuleCode":{
            this.findModulesByModuleCode();
            break;
          }
        }
        break;
      }
      case "Formazioni": {
        switch(this.filter){
          case "Name":{
            this.findStudyPlansByName();
            break;
          }
          case "StudyPlanContainsModule":{
            this.findStudyPlansByModuleCode();
            break;
          }
        }
        break;
      }
      case "Semestri": {
        switch(this.filter){
          case "Name":{
            this.findSemestersByName();
            break;
          }
          case "SemesterContainsModule":{
            this.findSemestersByModuleCode();
            break;
          }
        }
        break;
      }
      case "Certificazioni": {
        switch(this.filter){
          case "CertificationStudentName":{
            this.findCertificationsByStudentName();
            break;
          }
          case "CertificationStudentSurname":{
            this.findCertificationsByStudentSurname();
            break;
          }
          case "CertificationModule":{
            this.findCertificationsByModuleCode();
            break;
          }
        }
        break;
      }
    }
  }
  
  findStudentsByName(){
    let allStudents = [];
   this.restService.getAll('Student').subscribe(students => {
     allStudents = students;
     this.found = [];

     for(let i = 0; i<allStudents.length; i++){
       if(allStudents[i].name.includes(this.searchValue)){
         this.found.push(allStudents[i]);
       }
     }
    });
  }

  findStudentsBySurname(){
    let allStudents = [];
   this.restService.getAll('Student').subscribe(students => {
     allStudents = students;
     this.found = [];

     for(let i = 0; i<allStudents.length; i++){
       if(allStudents[i].surname.includes(this.searchValue)){
         this.found.push(allStudents[i]);
       }
     }
    });
  }


  findStudentsBySerialNumber(){
    let allStudents = [];
   this.restService.getAll('Student').subscribe(students => {
     allStudents = students;
     this.found = [];

     for(let i = 0; i<allStudents.length; i++){
       if(allStudents[i].serialNumber.toString().includes(this.searchValue.toString())){
         this.found.push(allStudents[i]);
       }
     }
    });
  }

  findDepartmentByName(){
    let allDepartments = [];
   this.restService.getAll('Department').subscribe(departments => {
    allDepartments = departments;
     this.found = [];

     for(let i = 0; i<allDepartments.length; i++){
       if(allDepartments[i].name.includes(this.searchValue)){
         this.found.push(allDepartments[i]);
       }
     }
    });
  }

  findCoursesByName(){
    let allCourses = [];
   this.restService.getAll('Course').subscribe(courses => {
    allCourses = courses;
     this.found = [];

     for(let i = 0; i<allCourses.length; i++){
       if(allCourses[i].name.includes(this.searchValue)){
         this.found.push(allCourses[i]);
       }
     }
    });
  }

  findCoursesByCourseCode(){
    let allCourses = [];
   this.restService.getAll('Course').subscribe(courses => {
    allCourses = courses;
     this.found = [];

     for(let i = 0; i<allCourses.length; i++){
       if(allCourses[i].courseCode.toString().includes(this.searchValue.toString())){
         this.found.push(allCourses[i]);
       }
     }
    });
  }

  findModulesByName(){
    let allModules = [];
   this.restService.getAll('Module').subscribe(modules => {
    allModules = modules;
     this.found = [];

     for(let i = 0; i<allModules.length; i++){
       if(allModules[i].name.includes(this.searchValue)){
         this.found.push(allModules[i]);
       }
     }
    });
  }

  findModulesByModuleCode(){
    let allModules = [];
   this.restService.getAll('Module').subscribe(modules => {
    allModules = modules;
     this.found = [];

     for(let i = 0; i<allModules.length; i++){
       if(allModules[i].moduleCode.toString().includes(this.searchValue.toString())){
         this.found.push(allModules[i]);
       }
     }
    });
  }

  findStudyPlansByName(){
    let allStudyPlans = [];
    this.restService.getAll('StudyPlan').subscribe(studyPlans => {
      allStudyPlans = studyPlans;
      this.found = [];
 
      for(let i = 0; i<allStudyPlans.length; i++){
        if(allStudyPlans[i].name.includes(this.searchValue)){
          this.found.push(allStudyPlans[i]);
        }
      }
     });
  }

  findStudyPlansByModuleCode(){
    let allStudyPlans = [];
    this.restService.getAll('StudyPlan').subscribe(studyPlans => {
      allStudyPlans = studyPlans;
      this.found = [];
 
      for(let i = 0; i<allStudyPlans.length; i++){
        for(let j = 0; j<allStudyPlans[i].modules.length; j++){
          
          if(allStudyPlans[i].modules[j].split('#')[1].includes(this.searchValue)){
            this.found.push(allStudyPlans[i]);
          }
        }
      }
     });
  }

  findSemestersByName(){
    let allSemesters = [];
    this.restService.getAll('Semester').subscribe(semesters => {
      allSemesters = semesters;
      this.found = [];
 
      for(let i = 0; i<allSemesters.length; i++){
        if(allSemesters[i].name.includes(this.searchValue)){
          this.found.push(allSemesters[i]);
        }
      }
     });
  }

  findSemestersByModuleCode(){
    let allSemesters = [];
    this.restService.getAll('Semester').subscribe(semesters => {
      allSemesters = semesters;
      this.found = [];
 
      for(let i = 0; i<allSemesters.length; i++){
        for(let j = 0; j<allSemesters[i].modules.length; j++){
          
          
          let allStudentModules = [];
          this.restService.getAll('StudentModule').subscribe(modules =>{
            allStudentModules = modules;

            for(let k = 0; k<allStudentModules.length; k++){

              console.log(allStudentModules[k].studentModuleID)
              console.log(allSemesters[i].modules[j].split('#')[1])
              console.log(this.searchValue)

              if(allStudentModules[k].studentModuleID === allSemesters[i].modules[j].split('#')[1]
                && allStudentModules[k].module.split('#')[1] === this.searchValue){
                this.found.push(allSemesters[i]);
              }
            }

          });


        }
      }
     });
  }

  findCertificationsByStudentName(){
    let allCertifications = [];
    this.restService.getAll('Certification').subscribe(certifications => {
      allCertifications = certifications;
      this.found = [];
 
      for(let i = 0; i<allCertifications.length; i++){

        this.restService.getObject('Student',allCertifications[i].student.toString().split('#')[1]).subscribe(student =>{
          if(student.name.includes(this.searchValue)){
            this.found.push(allCertifications[i]);
          }
        })

      }
     });
  }

  findCertificationsByStudentSurname(){
    let allCertifications = [];
    this.restService.getAll('Certification').subscribe(certifications => {
      allCertifications = certifications;
      this.found = [];
 
      for(let i = 0; i<allCertifications.length; i++){

        this.restService.getObject('Student',allCertifications[i].student.toString().split('#')[1]).subscribe(student =>{
          if(student.surname.includes(this.searchValue)){
            this.found.push(allCertifications[i]);
          }
        })

      }
     });
  }

  findCertificationsByModuleCode(){
    let allCertifications = [];
    this.restService.getAll('Certification').subscribe(certifications => {
      allCertifications = certifications;
      this.found = [];
 
      for(let i = 0; i<allCertifications.length; i++){

        this.restService.getObject('Module',allCertifications[i].module.toString().split('#')[1]).subscribe(module =>{
          if(module.moduleCode.toString().includes(this.searchValue.toString())){
            this.found.push(allCertifications[i]);
          }
        })
      }
     });
  }
}