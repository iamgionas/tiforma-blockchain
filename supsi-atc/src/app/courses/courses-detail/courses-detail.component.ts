import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/rest.service';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css']
})
export class CoursesDetailComponent implements OnInit {

  constructor(private rest : RestService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {

  }

  
}
