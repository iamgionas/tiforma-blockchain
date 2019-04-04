import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  baseUrl : string = "http://localhost:3000/api/Department";
  createUrl : string = "http://localhost:3000/api/CreateDepartment";

  constructor(private httpClient : HttpClient) { }

  getDepartments(){
    return this.httpClient.get(this.baseUrl);
  }

  getDepartment(id){
    return this.httpClient.get(this.baseUrl + '/' + id);
  }
}
