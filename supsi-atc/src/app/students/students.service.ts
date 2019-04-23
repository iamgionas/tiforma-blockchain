import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SUPSIService } from '../supsi.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private base = "Student";

  constructor(private supsiService: SUPSIService) { }

  getStudents() {
    return this.supsiService.getElements(this.base);
  }

  getStudent(id) {
    return this.supsiService.getElement(this.base, id);
  }

  createStudent(studentData) {
    return this.supsiService.operationToElement("Create" + this.base, studentData);
  }

  deleteStudent(studentData) {
    return this.supsiService.operationToElement("Delete" + this.base, studentData);
  }

  updateStudent(studentData) {
    return this.supsiService.operationToElement("Update" + this.base, studentData);
  }

  getStudyPlans(){
    return this.supsiService.getElements("StudyPlan");
  }

  getStudyPlan(id){
    return this.supsiService.getElement("StudyPlan",id);
  }

}