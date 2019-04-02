import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoursesService } from '../courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  baseUrl : string = "http://localhost:3000/api/Module";
  createUrl : string = "http://localhost:3000/api/CreateModule";

  constructor(private httpClient : HttpClient) { }

  getModules(){
    return this.httpClient.get(this.baseUrl);
  }

  getModule(id){
    return this.httpClient.get(this.baseUrl + '/' + id);
  }

  updateModule(id, moduleData){
    return this.httpClient.put(this.baseUrl + '/' + id, moduleData);
  }

  deleteModule(id) {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }

  getDepartments(){
    return this.httpClient.get('http://localhost:3000/api/Department');
  }

  deleteCourse(data){
    return this.httpClient.post("http://localhost:3000/api/RemoveCourseFromModule", data);
  }
}
