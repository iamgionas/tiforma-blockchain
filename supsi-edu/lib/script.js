'use strict'

/**
 * Creation of a brand new student. The student is automatically subscribed to a school by its studyPlan.
 * @param {ch.supsi.edu.CreateStudent} parameters
 * @transaction
 */
async function createStudent(parameters){
    let id = parameters.contactID;
    
    let factory = getFactory();
    
    let newStudent = factory.newResource('ch.supsi.edu', 'Student', id);
    newStudent.name = parameters.name;
    newStudent.surname = parameters.surname;
    newStudent.birthday = parameters.birthday;
    newStudent.nationality = parameters.nationality;
    newStudent.addresses = parameters.addresses;
    newStudent.statute = parameters.statute; 
    newStudent.serialNumber = parameters.serialNumber;
    newStudent.comment = parameters.comment;
  	newStudent.studyPlan = parameters.studyPlan;  
  
    let participantsRegistry = await getParticipantRegistry('ch.supsi.edu.Student');
    await participantsRegistry.add(newStudent);
}

/**
* Creation of a department
*@param {ch.supsi.edu.CreateDepartment} parameters
*@transaction
*/
async function createDepartment(parameters){
  let factory = getFactory();
  let newDepartment = factory.newResource('ch.supsi.edu', 'Department', parameters.name);
  
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.Department');
  await assetRegistry.add(newDepartment);
}

/**
* Creation of a Course
*@param {ch.supsi.edu.CreateCourse} parameters
*@transaction
*/
async function createCourse(parameters){
  let newCourse = getFactory().newResource('ch.supsi.edu', 'Course', parameters.courseCode);
  newCourse.name = parameters.name;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.Course');
  await assetRegistry.add(newCourse);
}

/**
* Creation of a Module
*@param {ch.supsi.edu.CreateModule} parameters
*@transaction
*/
async function createModule(parameters){
  let newModule = getFactory().newResource('ch.supsi.edu', 'Module', parameters.moduleCode);
  newModule.name = parameters.name;
  newModule.duration = parameters.duration;
  newModule.ETCS = parameters.ETCS;
  newModule.department = parameters.department;
  newModule.responsables = parameters.responsables;
  newModule.englishName = parameters.englishName;
  newModule.comment = parameters.comment;
  newModule.courses = parameters.courses;
  newModule.state = parameters.state;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.Module');
  await assetRegistry.add(newModule);
}

/**
* Creation of a Study Plan
*@param {ch.supsi.edu.CreateStudyPlan} parameters
*@transaction
*/
async function createStudyPlan(parameters){
  let newStudyPlan = getFactory().newResource('ch.supsi.edu', 'StudyPlan', parameters.name);
  newStudyPlan.name = parameters.name;
  newStudyPlan.departement = parameters.departement;
  newStudyPlan.state = parameters.state;
  newStudyPlan.comment = parameters.comment;
  newStudyPlan.modules = parameters.modules;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.StudyPlan');
  await assetRegistry.add(newStudyPlan);
}

/**
* Creation of a Semester
*@param {ch.supsi.edu.CreateSemester} parameters
*@transaction
*/
async function createSemester(parameters){
  let newSemester = getFactory().newResource('ch.supsi.edu', 'Semester', parameters.name);
  newSemester.name = parameters.name;
  newSemester.description = parameters.description;
  newSemester.modules = parameters.modules;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.Semester');
  await assetRegistry.add(newSemester);
}

/**
* Creation of a Semester
*@param {ch.supsi.edu.CreateStudentModule} parameters
*@transaction
*/
async function createStudentModule(parameters){
  let newStudentModule = getFactory().newResource('ch.supsi.edu', 'StudentModule', parameters.studentModuleID);
  newStudentModule.module = parameters.module;
  newStudentModule.students = parameters.students;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.StudentModule');
  await assetRegistry.add(newStudentModule);
}

/**
* Creation of a Certification
*@param {ch.supsi.edu.CreateCertification} parameters
*@transaction
*/
async function createCertification(parameters){
  // CHECK if student is subscribed
  let studentModuleRegistry = await getAssetRegistry('ch.supsi.edu.StudentModule');
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
  
  let newCertification = getFactory().newResource('ch.supsi.edu', 'Certification', parameters.certificationID);
  newCertification.module = parameters.module;
  newCertification.student = parameters.student;
  newCertification.grade = parameters.grade;
  
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.Certification');
  await assetRegistry.add(newCertification);
}

/**
* Creation of a Certification Session
*@param {ch.supsi.edu.CreateCertificationSession} parameters
*@transaction
*/
async function createCertificationSession(parameters){
  let newCertificationSession = getFactory().newResource('ch.supsi.edu', 'CertificationSession', parameters.name);
  newCertificationSession.department = parameters.department;
  newCertificationSession.semester = parameters.semester;
  newCertificationSession.title = parameters.title;
  newCertificationSession.date = parameters.date;
  newCertificationSession.subscribers = parameters.subscribers;
  
  
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.CertificationSession');
  await assetRegistry.add(newCertificationSession);
}


/**
* Subscription of a student to a semester
*@param {ch.supsi.edu.SubscriptionToSemester} parameters
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
  let assetRegistry = await getAssetRegistry('ch.supsi.edu.StudentModule');
  
  for(let i = 0; i<semester.modules.length; i++){
   semester.modules[i].students.push(student);
   await assetRegistry.update(semester.modules[i]);
  }
  
  //3) Check if a student already passed a module before subscribing him??
}