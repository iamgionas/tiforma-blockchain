import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/ch.supsi';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  private modules: Module[] = [];
  constructor(private modulesService: ModulesService) { }

  ngOnInit() {
    this.modulesService.getModules().subscribe((res: Module[]) => {
      this.modules = res;
    });
  }
}