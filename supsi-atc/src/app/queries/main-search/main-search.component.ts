import { Component, OnInit } from '@angular/core';

import {RestService} from '../../rest.service';


@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {

  constructor(private rest : RestService) { }

  ngOnInit() {
   // this.getType();
    //this.getFilter();
  }

  type : String;
  filter: String;
  searchValue: String;

  found : any = [];


  /*getType(){
    this.type = (String)($("#Type").val());
  }

  getFilter(){
    this.filter = (String)($("#Filter").val());
  }

  getSearchValue(){
    this.searchValue = (String)($("#searchValue").val());
  }*/

  find(){
    //this.getType();
    //this.getFilter();
    //this.getSearchValue();
    
    console.log("Type: "+this.type+".\nFilter: "+this.filter+".\nSearch Value: "+this.searchValue+".");

    switch(this.type){
      case "Studenti": {
        switch(this.filter){
          case "Name":{
            //Query not yet implemented back-end side.
            break;
          }
          case "Surname":{
            this.rest.getStudentsBySurname(this.searchValue).subscribe(data => this.found = data);
            console.log(this.found);
            break;
          }
          case "SerialNumber":{
            //Query not yet implemented back-end side.
            break;
          }
        }
        break;
      }
      case "Corsi": {
        switch(this.filter){
          case "Name":{
            this.rest.getCoursesByName(this.searchValue).subscribe(data => this.found = data);
            break;
          }
          case "CourseCode":{
            //Query not yet implemented back-end side.
            break;
          }
        }
        break;
      }
      case "Moduli": {
        switch(this.filter){
          case "Name":{
            this.rest.getModulesByName(this.searchValue).subscribe(data => this.found = data);
            break;
          }
          case "ModuleCode":{
            //Query not yet implemented back-end side.
            break;
          }
        }
        break;
      }
      case "Formazioni": {
        switch(this.filter){
          case "Name":{
            this.rest.getStudentModulesByName(this.searchValue).subscribe(data => this.found = data);
            break;
          }
          case "StudyPlanContainsModule":{
            //Query not yet implemented back-end side.
            break;
          }
        }
        break;
      }
      case "Semestri": {
        switch(this.filter){
          case "Name":{
            this.rest.getSemestersByName(this.searchValue).subscribe(data => this.found = data);
            break;
          }
          case "SemesterContainsModule":{
            //Query not yet implemented back-end side.
            break;
          }
        }
        break;
      }
      case "Certificazioni": {
        switch(this.filter){
          case "CertificationStudentName":{
            //Query not yet implemented back-end side.
            break;
          }
          case "CertificationStudentSurname":{
            //Query not yet implemented back-end side.
            break;
          }
          case "CertificationModule":{
            //Query not yet implemented back-end side.
            break;
          }
        }
        break;
      }
    }
  }
}