import { Injectable } from '@angular/core';

import { SUPSIService } from '../supsi.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormationsService {

  private base = "StudyPlan";

  constructor(private supsiService: SUPSIService, private httpClient: HttpClient) { }

  getStudyPlans() {
    return this.supsiService.getElements(this.base);
  }

  getStudyPlan(id) {
    return this.supsiService.getElement(this.base, id);
  }

  createStudyPlan(moduleData) {
    return this.supsiService.operationToElement("Create" + this.base, moduleData);
  }

  deleteStudyPlan(moduleData) {
    return this.supsiService.operationToElement("Delete" + this.base, moduleData);
  }

  updateStudyPlan(moduleData) {
    return this.supsiService.operationToElement("Update" + this.base, moduleData);
  }

  getDepartments(){
    return this.httpClient.get('http://localhost:3000/api/Department');
  }

  removeModule(data){
    return this.httpClient.post("http://localhost:3000/api/RemoveModuleFromStudyPlan", data);
  }

  addModule(data){
    return this.httpClient.post("http://localhost:3000/api/AddModuleToStudyPlan", data);
  }
}
