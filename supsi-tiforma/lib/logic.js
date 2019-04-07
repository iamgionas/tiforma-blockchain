'use strict'

/**
 * Creation of a brand new student. The student is automatically subscribed to a school by its studyPlan.
 * @param {ch.supsi.CreateStudent} parameters
 * @transaction
 */
async function createStudent(parameters){
    let id = parameters.contactID;
    
    let factory = getFactory();
    
    let newStudent = factory.newResource('ch.supsi', 'Student', id);
    newStudent.name = parameters.name;
    newStudent.surname = parameters.surname;
    newStudent.birthday = parameters.birthday;
    newStudent.nationality = parameters.nationality;
    newStudent.addresses = parameters.addresses;
    newStudent.statute = parameters.statute; 
    newStudent.serialNumber = parameters.serialNumber;
    newStudent.comment = parameters.comment;
  	newStudent.studyPlan = parameters.studyPlan;  
  
    let participantsRegistry = await getParticipantRegistry('ch.supsi.Student');
    await participantsRegistry.add(newStudent);
}

/**
 * Update of a student.
 * @param {ch.supsi.UpdateStudent} parameters
 * @transaction
 */
async function updateStudent(parameters){
  let participantsRegistry = await getParticipantRegistry('ch.supsi.Student');
  
  parameters.oldStudent.name = parameters.name;
  parameters.oldStudent.surname = parameters.surname;
  parameters.oldStudent.birthday = parameters.birthday;
  parameters.oldStudent.nationality = parameters.nationality;
  parameters.oldStudent.addresses = parameters.addresses;
  parameters.oldStudent.statute = parameters.statute; 
  parameters.oldStudent.serialNumber = parameters.serialNumber;
  parameters.oldStudent.comment = parameters.comment;
  parameters.oldStudent.studyPlan = parameters.studyPlan; 
  
  await participantsRegistry.update(parameters.oldStudent);
}

/**
 * Delete a student.
 * @param {ch.supsi.DeleteStudent} parameters
 * @transaction
 */
async function deleteStudent(parameters){
  let participantsRegistry = await getParticipantRegistry('ch.supsi.Student');
  await participantsRegistry.remove(parameters.student.contactID);
}


/**
* Creation of a department
*@param {ch.supsi.CreateDepartment} parameters
*@transaction
*/
async function createDepartment(parameters){
  let factory = getFactory();
  let newDepartment = factory.newResource('ch.supsi', 'Department', parameters.departmentID);
  newDepartment.name = parameters.name

  let assetRegistry = await getAssetRegistry('ch.supsi.Department');
  await assetRegistry.add(newDepartment);
}

/**
* Update of a department
*@param {ch.supsi.UpdateDepartment} parameters
*@transaction
*/
async function updateDepartment(parameters){
  parameters.oldDepartment.name = parameters.name;

  let assetRegistry = await getAssetRegistry('ch.supsi.Department');
  await assetRegistry.update(parameters.oldDepartment);
}


/**
* Deletion of a department
*@param {ch.supsi.DeleteDepartment} parameters
*@transaction
*/
async function deleteDepartment(parameters){
  let assetRegistry = await getAssetRegistry('ch.supsi.Department');
  await assetRegistry.remove(parameters.department.departmentID);
}



/**
* Creation of a Course
*@param {ch.supsi.CreateCourse} parameters
*@transaction
*/
async function createCourse(parameters){
  let newCourse = getFactory().newResource('ch.supsi', 'Course', parameters.courseCode);
  newCourse.name = parameters.name;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Course');
  await assetRegistry.add(newCourse);
}

/**
* Update a Course
*@param {ch.supsi.UpdateCourse} parameters
*@transaction
*/
async function updateCourse(parameters){
  
  parameters.oldCourse.name = parameters.name;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Course');
  await assetRegistry.update(parameters.oldCourse);
}

/**
* Delete a Course
*@param {ch.supsi.DeleteCourse} parameters
*@transaction
*/
async function DeleteCourse(parameters){
  let assetRegistry = await getAssetRegistry('ch.supsi.Course');
  await assetRegistry.remove(parameters.course.courseCode);
}

/**
* Creation of a Module
*@param {ch.supsi.CreateModule} parameters
*@transaction
*/
async function createModule(parameters){
  let newModule = getFactory().newResource('ch.supsi', 'Module', parameters.moduleCode);
  newModule.name = parameters.name;
  newModule.duration = parameters.duration;
  newModule.ETCS = parameters.ETCS;
  newModule.department = parameters.department;
  newModule.responsables = parameters.responsables;
  newModule.englishName = parameters.englishName;
  newModule.comment = parameters.comment;
  newModule.courses = parameters.courses;
  newModule.state = parameters.state;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Module');
  await assetRegistry.add(newModule);
}

/**
* Update of a Module
*@param {ch.supsi.UpdateModule} parameters
*@transaction
*/
async function updateModule(parameters){
  
  parameters.oldModule.name = parameters.name;
  parameters.oldModule.duration = parameters.duration;
  parameters.oldModule.ETCS = parameters.ETCS;
  parameters.oldModule.department = parameters.department;
  parameters.oldModule.responsables = parameters.responsables;
  parameters.oldModule.englishName = parameters.englishName;
  parameters.oldModule.comment = parameters.comment;
  parameters.oldModule.courses = parameters.courses;
  parameters.oldModule.state = parameters.state;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Module');
  await assetRegistry.update(parameters.oldModule);
}

/**
* Deletion of a Module
*@param {ch.supsi.DeleteModule} parameters
*@transaction
*/
async function deleteModule(parameters){
  let assetRegistry = await getAssetRegistry('ch.supsi.Module');
  await assetRegistry.remove(parameters.module.moduleCode);
}

/**
* Addition of a course to a module
*@param {ch.supsi.AddCourseToModule} parameters
*@transaction
*/
async function addCourseToModule(parameters){
  parameters.module.courses.push(parameters.course);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Module');
  await assetRegistry.update(parameters.module);
}

/**
* Deletion of a course from a module
*@param {ch.supsi.RemoveCourseFromModule} parameters
*@transaction
*/
async function removeCourseFromModule(parameters){
  let courseIndex = parameters.module.courses.indexOf(parameters.course);
  parameters.module.courses.splice(courseIndex,1);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Module');
  await assetRegistry.update(parameters.module);
}


/**
* Creation of a Study Plan
*@param {ch.supsi.CreateStudyPlan} parameters
*@transaction
*/
async function createStudyPlan(parameters){
  let newStudyPlan = getFactory().newResource('ch.supsi', 'StudyPlan', parameters.name);
  newStudyPlan.name = parameters.name;
  newStudyPlan.department = parameters.department;
  newStudyPlan.state = parameters.state;
  newStudyPlan.comment = parameters.comment;
  newStudyPlan.modules = parameters.modules;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.StudyPlan');
  await assetRegistry.add(newStudyPlan);
}

/**
* Update of a Study Plan
*@param {ch.supsi.UpdateStudyPlan} parameters
*@transaction
*/
async function updateStudyPlan(parameters){
  
  parameters.oldStudyPlan.department = parameters.department;
  parameters.oldStudyPlan.state = parameters.state;
  parameters.oldStudyPlan.comment = parameters.comment;
  parameters.oldStudyPlan.modules = parameters.modules;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.StudyPlan');
  await assetRegistry.update(parameters.oldStudyPlan);
}

/**
* Deletion of a Study Plan
*@param {ch.supsi.DeleteStudyPlan} parameters
*@transaction
*/
async function deleteStudyPlan(parameters){
  let assetRegistry = await getAssetRegistry('ch.supsi.StudyPlan');
  await assetRegistry.remove(parameters.studyplan.name);
}

/**
* Addition of a Module to a StudyPlan
*@param {ch.supsi.AddModuleToStudyPlan} parameters
*@transaction
*/
async function addModuleToStudyPlan(parameters){
  parameters.studyplan.modules.push(parameters.module);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.StudyPlan');
  await assetRegistry.update(parameters.studyplan);
}

/**
* Deletion of a Module from a StudyPlan
*@param {ch.supsi.RemoveModuleFromStudyPlan} parameters
*@transaction
*/
async function removeModuleFromStudyPlan(parameters){
  let moduleIndex = parameters.studyplan.modules.indexOf(parameters.module);
  parameters.studyplan.modules.splice(moduleIndex,1);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.StudyPlan');
  await assetRegistry.update(parameters.studyplan);
}

/**
* Creation of a Semester
*@param {ch.supsi.CreateSemester} parameters
*@transaction
*/
async function createSemester(parameters){
  let newSemester = getFactory().newResource('ch.supsi', 'Semester', parameters.name);
  newSemester.name = parameters.name;
  newSemester.description = parameters.description;
  newSemester.modules = parameters.modules;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Semester');
  await assetRegistry.add(newSemester);
}

/**
* Update of a Semester
*@param {ch.supsi.UpdateSemester} parameters
*@transaction
*/
async function updateSemester(parameters){
  
  parameters.oldSemester.description = parameters.description;
  parameters.oldSemester.modules = parameters.modules;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Semester');
  await assetRegistry.update(parameters.oldSemester);
}

/**
* Deletion of a Semester
*@param {ch.supsi.DeleteSemester} parameters
*@transaction
*/
async function deleteSemester(parameters){
  let assetRegistry = await getAssetRegistry('ch.supsi.Semester');
  await assetRegistry.remove(parameters.semester.name);
}

/**
* Addition of a student module (classroom) to a semester 
*@param {ch.supsi.AddStudentModuleToSemester} parameters
*@transaction
*/
async function addStudentModuleToSemester(parameters){
  parameters.semester.modules.push(parameters.studentModule);
  let assetRegistry = await getAssetRegistry('ch.supsi.Semester');
  await assetRegistry.update(parameters.semester);
}

/**
* Deletion of a student module (classroom) from a semester 
*@param {ch.supsi.RemoveStudentModuleFromSemester} parameters
*@transaction
*/
async function removeStudentModuleFromSemester(parameters){
  let indexStudentModule = parameters.semester.modules.indexOf(parameters.studentmodule);
  parameters.semester.modules.splice(indexStudentModule, 1);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Semester');
  await assetRegistry.update(parameters.semester);
}

/**
* Creation of a Student Module (classroom)
*@param {ch.supsi.CreateStudentModule} parameters
*@transaction
*/
async function createStudentModule(parameters){
  let newStudentModule = getFactory().newResource('ch.supsi', 'StudentModule', parameters.studentModuleID);
  newStudentModule.module = parameters.module;
  newStudentModule.students = parameters.students;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.StudentModule');
  await assetRegistry.add(newStudentModule);
}

/**
* Update of a Student Module (classroom)
*@param {ch.supsi.UpdateStudentModule} parameters
*@transaction
*/
async function updateStudentModule(parameters){
  
  parameters.oldStudentModule.module = parameters.module;
  parameters.oldStudentModule.students = parameters.students;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.StudentModule');
  await assetRegistry.update(parameters.oldStudentModule);
}

/**
* Deletion of a Student Module (classroom)
*@param {ch.supsi.DeleteStudentModule} parameters
*@transaction
*/
async function deleteStudentModule(parameters){
  let assetRegistry = await getAssetRegistry('ch.supsi.StudentModule');
  await assetRegistry.remove(parameters.studentmodule.studentModuleID);
}

/**
* Addition of a student to a studentmodule (classroom)
*@param {ch.supsi.AddStudentToStudentModule} parameters
*@transaction
*/
async function addStudentToStudentModule(parameters){
  parameters.studentmodule.students.push(parameters.student);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.StudentModule');
  await assetRegistry.update(parameters.studentmodule);
}

/**
* Deletion of a student from a studentmodule (classroom)
*@param {ch.supsi.RemoveStudentFromStudentModule} parameters
*@transaction
*/
async function removeStudentFromStudentModule(parameters){
  let indexStudent = parameters.studentmodule.students.indexOf(parameters.student);
  parameters.studentmodule.students.splice(indexStudent, 1);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.StudentModule');
  await assetRegistry.update(parameters.studentmodule);
}

/**
* Creation of a Certification
*@param {ch.supsi.CreateCertification} parameters
*@transaction
*/
async function createCertification(parameters){
  // CHECK if student is subscribed
  let studentModuleRegistry = await getAssetRegistry('ch.supsi.StudentModule');
  let studentModules = await studentModuleRegistry.getAll();
  
  let subscribed = false;
  
  for(let sm of studentModules){
    if(sm.module.$identifier == parameters.module.$identifier){
      for(let i = 0; i<sm.students.length; i++){
		if(sm.students[i].$identifier == parameters.student.$identifier){
           subscribed = true;
        }
      }
  	}
  }
  
  if(!subscribed)
    return;
  
  let newCertification = getFactory().newResource('ch.supsi', 'Certification', parameters.certificationID);
  newCertification.module = parameters.module;
  newCertification.student = parameters.student;
  newCertification.grade = parameters.grade;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Certification');
  await assetRegistry.add(newCertification);
}

/**
* Update of a Certification
*@param {ch.supsi.UpdateCertification} parameters
*@transaction
*/
async function updateCertification(parameters){
  let studentModuleRegistry = await getAssetRegistry('ch.supsi.StudentModule');
  let studentModules = await studentModuleRegistry.getAll();
  
  let subscribed = false;
  
  for(let sm of studentModules){
    if(sm.module.$identifier == parameters.module.$identifier){
      for(let i = 0; i<sm.students.length; i++){
		    if(sm.students[i].$identifier == parameters.student.$identifier){
           subscribed = true;
        }
      }
  	}
  }
  
  if(!subscribed){
    console.log("NOT SUBSCRIBED");
    return;
  }
    
  parameters.oldCertification.module = parameters.module;
  parameters.oldCertification.student = parameters.student;
  parameters.oldCertification.grade = parameters.grade;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.Certification');
  await assetRegistry.update(parameters.oldCertification);
}

/**
* Deletion of a Certification
*@param {ch.supsi.DeleteCertification} parameters
*@transaction
*/
async function deleteCertification(parameters){
  let assetRegistry = await getAssetRegistry('ch.supsi.Certification');
  await assetRegistry.remove(parameters.certification.certificationID);
}

/**
* Creation of a Certification Session
*@param {ch.supsi.CreateCertificationSession} parameters
*@transaction
*/
async function createCertificationSession(parameters){
  let newCertificationSession = getFactory().newResource('ch.supsi', 'CertificationSession', parameters.name);
  newCertificationSession.department = parameters.department;
  newCertificationSession.semester = parameters.semester;
  newCertificationSession.title = parameters.title;
  newCertificationSession.date = parameters.date;
  newCertificationSession.subscribers = parameters.subscribers;
  
  
  let assetRegistry = await getAssetRegistry('ch.supsi.CertificationSession');
  await assetRegistry.add(newCertificationSession);
}

/**
* Update of a Certification Session
*@param {ch.supsi.UpdateCertificationSession} parameters
*@transaction
*/
async function updateCertificationSession(parameters){
  
  parameters.oldCertificationSession.department = parameters.department;
  parameters.oldCertificationSession.semester = parameters.semester;
  parameters.oldCertificationSession.title = parameters.title;
  parameters.oldCertificationSession.date = parameters.date;
  parameters.oldCertificationSession.subscribers = parameters.subscribers;
  
  
  let assetRegistry = await getAssetRegistry('ch.supsi.CertificationSession');
  await assetRegistry.update(parameters.oldCertificationSession);
}

/**
* Deletion of a Certification Session
*@param {ch.supsi.DeleteCertificationSession} parameters
*@transaction
*/
async function deleteCertificationSession(parameters){
  let assetRegistry = await getAssetRegistry('ch.supsi.CertificationSession');
  await assetRegistry.remove(parameters.certificationsession.name);
}

/**
* Adds a certification to a certification session.
*@param {ch.supsi.AddCertificationToCertificationSession} parameters
*@transaction
*/
async function addCertificationToCertificationSession(parameters){
  parameters.certificationsession.subscribers.push(parameters.certification);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.CertificationSession');
  await assetRegistry.update(parameters.certificationsession);
}

/**
* Deletion of a certification from a certification session.
*@param {ch.supsi.RemoveCertificationFromCertificationSession} parameters
*@transaction
*/
async function removeCertificationToCertificationSession(parameters){
  let indexCertification = parameters.certificationsession.subscribers.indexOf(parameters.certification);
  parameters.certificationsession.subscribers.splice(indexCertification, 1);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.CertificationSession');
  await assetRegistry.update(parameters.certificationsession);
}

/**
* Subscription of a student to a semester
*@param {ch.supsi.SubscriptionToSemester} parameters
*@transaction
*/
async function subscribeStudentToSemester(parameters){
  let student = parameters.student;
  let semester = parameters.semester;
  
  //1) Check if the semester is appliable to the student according to his studyplan.
  for(let i = 0; i < semester.modules.length; i++){
    let containsModule = false;
    for(let j = 0; j < student.studyPlan.modules.length; j++){
      if(semester.modules[i].module === student.studyPlan.modules[j]){
         containsModule = true;
         break;
       }
    }
    if(!containsModule)		//ERROR - Module is not part of the student's study program.
      return;
  }
  
  //2) Subscribe student to all Modules in the semester and update registry.
  let assetRegistry = await getAssetRegistry('ch.supsi.StudentModule');
  
  for(let i = 0; i<semester.modules.length; i++){
   semester.modules[i].students.push(student);
   await assetRegistry.update(semester.modules[i]);
  }
  
  //3) Check if a student already passed a module before subscribing him??
}