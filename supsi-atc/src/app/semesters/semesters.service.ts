import { Injectable } from '@angular/core';
import { SUPSIService } from '../supsi.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SemestersService {

  private base = "Semester";

  constructor(private supsiService: SUPSIService, private httpClient: HttpClient) { }

  getSemesters() {
    return this.supsiService.getElements(this.base);
  }

  getSemester(id) {
    return this.supsiService.getElement(this.base, id);
  }

  createSemester(semesterData) {
    return this.supsiService.operationToElement("Create" + this.base, semesterData);
  }

  deleteSemester(semesterData) {
    return this.supsiService.operationToElement("Delete" + this.base, semesterData);
  }

  updateSemester(semesterData) {
    return this.supsiService.operationToElement("Update" + this.base, semesterData);
  }

  getFormations(){
    return this.httpClient.get('http://localhost:3000/api/StudyPlan');
  }

  createStudentModule(data){
    return this.supsiService.operationToElement("CreateStudentModule", data);
  }

  addStudentModuleToSemester(data){
    return this.supsiService.operationToElement("AddStudentModuleToSemester", data);
  }

  removeStudentModuleFromSemester(data){
    return this.supsiService.operationToElement("RemoveStudentModuleFromSemester", data);
  }

  getStudentModule(id){
    return this.httpClient.get('http://localhost:3000/api/StudentModule/'+id);
  }

  addStudentToStudentModule(data){
    return this.supsiService.operationToElement("AddStudentToStudentModule", data);
  }

  removeStudentFromStudentModule(data){
    return this.supsiService.operationToElement("RemoveStudentFromStudentModule", data);
  }

}
