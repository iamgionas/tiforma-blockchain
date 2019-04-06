import { Injectable } from '@angular/core';
import { SUPSIService } from '../supsi.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private base = "Course";

  constructor(private supsiService: SUPSIService) { }

  getCourses() {
    return this.supsiService.getElements(this.base);
  }

  getCourse(id) {
    return this.supsiService.getElement(this.base, id);
  }

  createCourse(courseData) {
    return this.supsiService.operationToElement("Create" + this.base, courseData);
  }

  deleteCourse(courseData) {
    return this.supsiService.operationToElement("Delete" + this.base, courseData);
  }

  updateCourse(courseData) {
    return this.supsiService.operationToElement("Update" + this.base, courseData);
  }

}