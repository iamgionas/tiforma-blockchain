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


    console.log("FOUND: "+this.found);
  }

  
  findStudentsByName(){
    this.found = [];
    this.restService.getAll('Student').subscribe(s => this.found = s);

    
  }

}