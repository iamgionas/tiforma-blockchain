import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  baseUrl : string = "http://localhost:3000/api/";

  private NAMESPACE = 'Student';

  constructor(private httpClient : HttpClient) { }

  getStudents(){
    return this.httpClient.get(this.baseUrl + 'Student');
  }

  getStudent(id : number){
    return this.httpClient.get(this.baseUrl + 'Student/' + id);
  }

  updateStudent(id, studentData){
    return this.httpClient.put(this.baseUrl + 'Student/' + id, studentData);
  }

  deleteStudent(id : number) {
    return this.httpClient.delete(this.baseUrl + 'Student/' + id);
  }

}