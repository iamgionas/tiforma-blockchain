import { Component, OnInit } from '@angular/core';

import {DataService} from '../data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { httpFactory } from '@angular/http/src/http_module';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestAPIComponent implements OnInit {


  //Bisogna imparare ad usare il DATASERVICE
  
  constructor(/*dataService : DataService<any>*/
              private http : HttpClient) {

     }

  ngOnInit() {
    this.http.get<String>('/api/Student/1?resolve=true').subscribe(s => this.student = s);
    //this.dataService.getSingle('Student','1').subscribe(s => this.student = s);    
  }

  student : String
}
