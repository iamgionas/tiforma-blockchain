export abstract class Asset {
}
export abstract class Participant {
}
export abstract class Transaction {
   transactionId: string;
   timestamp: Date;
}
// export namespace ch.supsi{
export class Address extends Asset {
   addressID: string;
   street: string;
   number: string;
   cap: string;
   city: string;
   country: string;
   addressType: string;
   email: string;
   telephoneNumber: string;
}
export abstract class Contact extends Participant {
   contactID: string;
   name: string;
   surname: string;
   birthday: Date;
   nationality: string;
}
export class Student extends Contact {
   statute: string;
   serialNumber: string;
   comment: string;
   studyPlan: StudyPlan;
}
export class CreateStudent extends Transaction {
   contactID: string;
   name: string;
   surname: string;
   birthday: Date;
   nationality: string;
   statute: string;
   serialNumber: string;
   comment: string;
}
export class UpdateStudent extends Transaction {
   oldStudent: Student;
   newStudent: Student;
}
export class DeleteStudent extends Transaction {
   student: Student;
}
export class Collaborator extends Contact {
}
export class Department extends Asset {
   name: string;
}
export class CreateDepartment extends Transaction {
   name: string;
}
export class UpdateDepartment extends Transaction {
   oldDepartment: Department;
   newDepartment: Department;
}
export class DeleteDepartment extends Transaction {
   department: Department;
}
export class Course extends Asset {
   courseCode: string;
   name: string;
}
export class CreateCourse extends Transaction {
   courseCode: string;
   name: string;
}
export class UpdateCourse extends Transaction {
   oldCourse: Course;
   newCourse: Course;
}
export class DeleteCourse extends Transaction {
   course: Course;
}
export class Module extends Asset {
   moduleCode: string;
   name: string;
   duration: number;
   ETCS: number;
   department: Department;
   state: string;
   responsables: Collaborator[];
   englishName: string;
   comment: string;
   courses: Course[];
}
export class CreateModule extends Transaction {
   moduleCode: string;
   name: string;
   duration: number;
   ETCS: number;
   department: Department;
   state: string;
   responsables: Collaborator[];
   englishName: string;
   comment: string;
   courses: Course[];
}
export class UpdateModule extends Transaction {
   oldModule: Module;
   newModule: Module;
}
export class DeleteModule extends Transaction {
   module: Module;
}
export class StudyPlan extends Asset {
   name: string;
   department: Department;
   state: string;
   comment: string;
   modules: Module[];
}
export class CreateStudyPlan extends Transaction {
   name: string;
   departement: Department;
   state: string;
   comment: string;
   modules: Module[];
}
export class UpdateStudyPlan extends Transaction {
   oldStudyPlan: StudyPlan;
   newStudyPlan: StudyPlan;
}
export class DeleteStudyPlan extends Transaction {
   studyplan: StudyPlan;
}
export class Semester extends Asset {
   name: string;
   description: string;
   modules: StudentModule[];
}
export class CreateSemester extends Transaction {
   name: string;
   description: string;
   modules: StudentModule[];
}
export class UpdateSemester extends Transaction {
   oldSemester: Semester;
   newSemester: Semester;
}
export class DeleteSemester extends Transaction {
   semester: Semester;
}
export class StudentModule extends Asset {
   studentModuleID: string;
   module: Module;
   students: Student[];
}
export class CreateStudentModule extends Transaction {
   studentModuleID: string;
   module: Module;
   students: Student[];
}
export class UpdateStudentModule extends Transaction {
   oldStudentModule: StudentModule;
   newStudentModule: StudentModule;
}
export class DeleteStudentModule extends Transaction {
   studentmodule: StudentModule;
}
export class Certification extends Asset {
   certificationID: string;
   module: Module;
   student: Student;
   grade: number;
}
export class CreateCertification extends Transaction {
   certificationID: string;
   module: Module;
   student: Student;
   grade: number;
}
export class UpdateCertification extends Transaction {
   oldCertification: Certification;
   newCertification: Certification;
}
export class DeleteCertification extends Transaction {
   certification: Certification;
}
export class CertificationSession extends Asset {
   name: string;
   department: Department;
   semester: Semester;
   title: string;
   date: Date;
   subscribers: Certification[];
}
export class CreateCertificationSession extends Transaction {
   name: string;
   department: Department;
   semester: Semester;
   title: string;
   date: Date;
   subscribers: Certification[];
}
export class UpdateCertificationSession extends Transaction {
   oldCertificationSession: CertificationSession;
   newCertificationSession: CertificationSession;
}
export class DeleteCertificationSession extends Transaction {
   certificationsession: CertificationSession;
}
export class SubscriptionToSemester extends Transaction {
   student: Student;
   semester: Semester;
}
// }
