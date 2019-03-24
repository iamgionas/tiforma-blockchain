import { Component, OnInit } from '@angular/core';

import {DataService} from '../data.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { httpFactory } from '@angular/http/src/http_module';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css'],
  providers : [DataService]
})
export class TestAPIComponent implements OnInit {
  
  constructor(private dataService : DataService<any>) {

     }

  ngOnInit() {
    this.dataService.getSingle('Student','1').subscribe(s => this.student = s);    
  }

  student : String
}
