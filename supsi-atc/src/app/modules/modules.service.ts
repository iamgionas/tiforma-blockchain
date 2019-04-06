import { Injectable } from '@angular/core';
import { SUPSIService } from '../supsi.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  private base = "Module";

  constructor(private supsiService: SUPSIService, private httpClient: HttpClient) { }

  getModules() {
    return this.supsiService.getElements(this.base);
  }

  getModule(id) {
    return this.supsiService.getElement(this.base, id);
  }

  createModule(moduleData) {
    return this.supsiService.operationToElement("Create" + this.base, moduleData);
  }

  deleteModule(moduleData) {
    return this.supsiService.operationToElement("Delete" + this.base, moduleData);
  }

  updateModule(moduleData) {
    return this.supsiService.operationToElement("Update" + this.base, moduleData);
  }

  getDepartments(){
    return this.httpClient.get('http://localhost:3000/api/Department');
  }

  deleteCourse(data){
    return this.httpClient.post("http://localhost:3000/api/RemoveCourseFromModule", data);
  }

  addCourse(data){
    return this.httpClient.post("http://localhost:3000/api/AddCourseToModule", data);
  }
}
