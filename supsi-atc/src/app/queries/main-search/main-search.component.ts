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
    this.getType();
    this.getFilter();
  }

  type : String;
  filter: String;
  searchValue: String;

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
    console.log("Type: "+this.type+".\nFilter: "+this.filter+".\nSearch Value: "+this.searchValue+".");

    switch(this.type){
      case "Studenti": {
        switch(this.filter){
          case "Name":{
            
            break;
          }
          case "Surname":{
            this.rest.getStudentsBySurname(this.searchValue).subscribe(data => this.found = data);
            console.log(this.found);
            break;
          }
          case "SerialNumber":{

            break;
          }
        }
        break;
      }
      case "Corsi": {
        switch(this.filter){
          case "Name":{

            break;
          }
          case "CourseCode":{

            break;
          }
        }
        break;
      }
      case "Moduli": {
        switch(this.filter){
          case "Name":{

            break;
          }
          case "ModuleCode":{
            
            break;
          }
        }
        break;
      }
      case "Formazioni": {
        switch(this.filter){
          case "Name":{

            break;
          }
          case "StudyPlanContainsModule":{
            
            break;
          }
        }
        break;
      }
      case "Semestri": {
        switch(this.filter){
          case "Name":{

            break;
          }
          case "SemesterContainsModule":{
            
            break;
          }
        }
        break;
      }
      case "Certificazioni": {
        switch(this.filter){
          case "Name":{

            break;
          }
          case "CertificationStudentName":{
            
            break;
          }
          case "CertificationStudentSurname":{
            
            break;
          }
          case "CertificationModule":{
            
            break;
          }
        }
        break;
      }
    }
  }
}