import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';
import { Department } from 'src/app/ch.supsi';

@Component({
  selector: 'app-module-new',
  templateUrl: './module-new.component.html',
  styleUrls: ['./module-new.component.css']
})
export class ModuleNewComponent implements OnInit {

  private departmentList: {};
  private loading: boolean;

  @Input() moduleData: any = {
    $class: 'ch.supsi.CreateModule',
    moduleCode: '',
    name: '',
    duration: '',
    ETCS: '',
    department: '',
    state: '',
    englishName: '',
    comment: '',
    courses: []
  };

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.departmentList = {};
    this.modulesService.getDepartments().subscribe((res: Department[]) => {
      res.forEach(dept => {
        this.departmentList[dept.name] = ("resource:ch.supsi.Department#" + dept.name);
      });

    });
  }

  createModule() {
    this.loading = true;
    this.moduleData.moduleCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.modulesService.createModule(this.moduleData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
