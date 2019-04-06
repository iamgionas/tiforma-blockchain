import { Injectable } from '@angular/core';
import { SUPSIService } from '../supsi.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private base = "Department"

  constructor(private supsiService: SUPSIService) { }

  getDepartments() {
    return this.supsiService.getElements(this.base);
  }

  getDepartment(id) {
    return this.supsiService.getElement(this.base, id);
  }

  createDepartment(departmentData) {
    return this.supsiService.operationToElement("Create" + this.base, departmentData);
  }

  deleteDepartment(departmentData) {
    return this.supsiService.operationToElement("Delete" + this.base, departmentData);
  }

  updateDepartment(departmentData) {
    return this.supsiService.operationToElement("Update" + this.base, departmentData);
  }
}
