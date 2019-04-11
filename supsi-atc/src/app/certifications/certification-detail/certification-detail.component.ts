import { Component, OnInit, Input } from '@angular/core';
import { Certification, Student, Module } from 'src/app/ch.supsi';
import { ActivatedRoute } from '@angular/router';
import { CertificationService } from '../certifications.service';
import { StudentsService } from 'src/app/students/students.service';
import { ModulesService } from 'src/app/modules/modules.service';

@Component({
  selector: 'app-certification-detail',
  templateUrl: './certification-detail.component.html',
  styleUrls: ['./certification-detail.component.css']
})
export class CertificationDetailComponent implements OnInit {

  private certification : Certification;
  private student : Student;
  private module : Module;

  @Input() certificationData: any = {
    $class: 'ch.supsi.UpdateCertification',
    oldCertification: 'resource:ch.supsi.Certification#',
    student: 'resource:ch.supsi.Student#',
    module: 'resource:ch.supsi.Module#',
    grade : 0
  };

  private certificationDataToDelete = {
    $class: "ch.supsi.DeleteCertification",
    certification: "resource:ch.supsi.Certification#"
  }

  constructor(private route: ActivatedRoute,
              private certificationService: CertificationService,
              private studentsService : StudentsService,
              private modulesService : ModulesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.certificationService.getCertification(this.route.snapshot.params['id']).subscribe((data: Certification) => {
          this.certification = data;
          
          this.certificationData.oldCertification += this.route.snapshot.params['id'];

          this.certificationData.student = this.certification.student;
          this.certificationData.module = this.certification.module;
          this.certificationData.grade = this.certification.grade;

          this.getStudent();
          this.getModule();

          this.certificationDataToDelete.certification += this.route.snapshot.params['id'];
        });
      }
    })
  }

  getStudent() {
    this.studentsService.getStudent(this.certification.student.toString().split('#')[1])
    .subscribe( (s : Student) => {
      this.student = s;
    });
  }

  getModule() {
    this.modulesService.getModule(this.certification.module.toString().split('#')[1])
    .subscribe( (m : Module) => {
      this.module = m;
    });
  }

  updateCertification() {
    this.certificationService.updateCertification(this.certificationData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteCertification() {
    this.certificationService.deleteCertification(this.certificationDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
