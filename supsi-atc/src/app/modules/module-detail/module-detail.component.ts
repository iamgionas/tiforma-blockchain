import { Component, OnInit, Input } from '@angular/core';
import { Module, Department } from 'src/app/ch.supsi';
import { ActivatedRoute } from '@angular/router';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {

  private module : Module;
  private departmentList : Department[];
  @Input() moduleData: any = {
    $class: 'ch.supsi.Module',
    //moduleCode: '',
    name: '',
    duration: '',
    ETCS: '',
    department: '', //"resource:ch.supsi.Department#DTI",
    state: '',
    responsables: [''],
    englishName: '',
    comment: '',
    courses: [''],
  };

  constructor(
    private route: ActivatedRoute,
    private modulesService: ModulesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.modulesService.getDepartments().subscribe((res: Department[]) => {
          this.departmentList = res;
        });
        this.modulesService.getModule(this.route.snapshot.params['id']).subscribe((data: Module) => {
          this.module = data;
          //this.moduleData.moduleCode = this.module.moduleCode;
          this.moduleData.name = this.module.name;
          this.moduleData.duration = this.module.duration;
          this.moduleData.ETCS = this.module.ETCS;
          this.moduleData.department = this.module.department.toString().split('#')[1];
          this.moduleData.state = this.module.state;
          this.moduleData.comment = this.module.comment;
          this.moduleData.responsables = this.module.responsables;
          this.moduleData.courses = this.module.courses;
        });
        
      }
    })
  }

  updateModule() {
    this.modulesService.updateModule(this.route.snapshot.params['id'], this.moduleData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
