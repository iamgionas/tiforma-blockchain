import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  baseUrl : string = "http://localhost:3000/api/Course";

  constructor(private httpClient : HttpClient) { }

  getCourses(){
    return this.httpClient.get(this.baseUrl);
  }

  getCourse(id : number){
    return this.httpClient.get(this.baseUrl + '/' + id);
  }

  updateCourse(id, courseData){
    return this.httpClient.put(this.baseUrl + '/' + id, courseData);
  }

  deleteCourse(id : number) {
    return this.httpClient.delete(this.baseUrl + '/' + id);
  }

}