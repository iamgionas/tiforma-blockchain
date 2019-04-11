import { Injectable } from '@angular/core';
import { SUPSIService } from '../supsi.service';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  private base = "Certification";

  constructor(private supsiService: SUPSIService) { }

  getCertifications() {
    return this.supsiService.getElements(this.base);
  }

  getCertification(id) {
    return this.supsiService.getElement(this.base, id);
  }

  createCertification(courseData) {
    return this.supsiService.operationToElement("Create" + this.base, courseData);
  }

  deleteCertification(courseData) {
    return this.supsiService.operationToElement("Delete" + this.base, courseData);
  }

  updateCertification(courseData) {
    return this.supsiService.operationToElement("Update" + this.base, courseData);
  }

}