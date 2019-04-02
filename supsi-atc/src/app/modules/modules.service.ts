import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  getModule(id : number){
    return this.httpClient.get(this.baseUrl + '/' + id);
  }

  getDepartments(){
    return this.httpClient.get('http://localhost:3000/api/Department');
  }
}
