import { Component, OnInit } from '@angular/core';
import { CertificationService} from '../certifications.service';
import { Certification, Student } from 'src/app/ch.supsi';
import { StudentsService } from 'src/app/students/students.service';

@Component({
  selector: 'app-certification-list',
  templateUrl: './certification-list.component.html',
  styleUrls: ['./certification-list.component.css']
})
export class CertificationListComponent implements OnInit {

  private certifications: Certification[] = [];
  private students: Student[] = [];

  constructor(private certificationService: CertificationService,
              private studentService: StudentsService) { }

  ngOnInit() {
    this.certificationService.getCertifications().subscribe((res: Certification[]) => {
      this.certifications = res;
    });
    this.studentService.getStudents().subscribe((res : Student[]) => {
      this.students = res;
    });
  }
}