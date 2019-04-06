import { Injectable } from '@angular/core';
import { SUPSIService } from '../supsi.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SemestersService {

  private base = "Semester";

  constructor(private supsiService: SUPSIService, private httpClient: HttpClient) { }

  getSemesters() {
    return this.supsiService.getElements(this.base);
  }

  getSemester(id) {
    return this.supsiService.getElement(this.base, id);
  }

  createSemester(semesterData) {
    return this.supsiService.operationToElement("Create" + this.base, semesterData);
  }

  deleteSemester(semesterData) {
    return this.supsiService.operationToElement("Delete" + this.base, semesterData);
  }

  updateSemester(semesterData) {
    return this.supsiService.operationToElement("Update" + this.base, semesterData);
  }
}
