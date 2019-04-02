import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  baseUrl : string = "http://localhost:3000/api/Course";
  createUrl : string = "http://localhost:3000/api/CreateCourse";

  constructor(private httpClient : HttpClient) { }

  getCourses(){
    return this.httpClient.get(this.baseUrl);
  }

  getCourse(id){
    return this.httpClient.get(this.baseUrl + '/' + id);
  }

  updateCourse(id, courseData){
    return this.httpClient.put(this.baseUrl + '/' + id, courseData);
  }

  deleteCourse(id) {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }

  createCourse(courseData){
    return this.httpClient.post(this.createUrl, courseData);
  }

}