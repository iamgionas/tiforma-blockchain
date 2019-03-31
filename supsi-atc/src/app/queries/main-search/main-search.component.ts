import { Component, OnInit } from '@angular/core';
import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.css']
})
export class MainSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getType();
  }

  type : String;

  getType(){
    this.type = (String)($("#Tipo").val());
  }
}
