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
  private loading: boolean;

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
    this.loading = false;
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.certificationService.getCertification(this.route.snapshot.params['id']).subscribe((data: Certification) => {
          this.certification = data;
          
          this.getStudent();
          this.getModule();

          this.certificationData.oldCertification = 'resource:ch.supsi.Certification#' + this.route.snapshot.params['id'];

          this.certificationData.student = this.certification.student;
          this.certificationData.module = this.certification.module;
          this.certificationData.grade = this.certification.grade;

          this.certificationDataToDelete.certification =this.certificationData.oldCertification;
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
    this.loading = true;
    this.certificationService.updateCertification(this.certificationData).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  deleteCertification() {
    this.loading = true;
    this.certificationService.deleteCertification(this.certificationDataToDelete).subscribe((result) => {
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  printDetail() : void{
    let printContents, popupWin;
    let buttonGroup = document.querySelector('div.btn-group');

    document.querySelector('#moduleCodeAndName').setAttribute('value',this.module.moduleCode+" - "+this.module.name);
    document.querySelector('#student').setAttribute('value', this.student.contactID+' - '+this.student.name+' '+this.student.surname);
    document.querySelector('#grade').setAttribute('value',this.certification.grade.toString());
    
    printContents = document.querySelector('#certificationDetail');
    printContents.removeChild(buttonGroup);
    printContents = printContents.innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();

    window.location.reload();
  }
}
