import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CertificationService} from '../certifications.service';
import { Student, Module, Certification } from 'src/app/ch.supsi';
import { StudentsService } from 'src/app/students/students.service';
import { ModulesService } from 'src/app/modules/modules.service';

@Component({
  selector: 'app-certification-new',
  templateUrl: './certification-new.component.html',
  styleUrls: ['./certification-new.component.css']
})
export class CertificationNewComponent implements OnInit {

  private certifications : Certification[] = [];
  private students : Student[] = [];
  private modules : Module[] = [];
  private loading: boolean;

  @Input() certificationData: any = {
    $class: 'ch.supsi.CreateCertification',
    certificationID : '',
    student: '',
    module: '',
    grade: ''
  };

  constructor(
    private route: ActivatedRoute,
    private certificationService: CertificationService,
    private studentsService : StudentsService,
    private modulesService : ModulesService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.certificationService.getCertifications().subscribe((res: Certification[]) => {
      this.certifications = res;
    });

    this.studentsService.getStudents().subscribe((res: Student[]) => {
      this.students = res;
    });

    this.modulesService.getModules().subscribe((res: Module[]) => {
      this.modules = res;
    });
  }

  createCertification() {
    this.loading = true;
    this.certificationData.certificationID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    this.certificationService.createCertification(this.certificationData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
