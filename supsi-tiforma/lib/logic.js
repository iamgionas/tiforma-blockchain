/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
/**
 * Write your transction processor functions here
 */

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
    //newStudent.addresses = parameters.addresses;
    newStudent.statute = parameters.statute; 
    newStudent.serialNumber = parameters.serialNumber;
    newStudent.comment = parameters.comment;
  	//newStudent.studyPlan = parameters.studyPlan;  
  
    let participantsRegistry = await getParticipantRegistry('ch.supsi.Student');
    await participantsRegistry.add(newStudent);
}

/**
* Creation of a department
*@param {ch.supsi.CreateDepartment} parameters
*@transaction
*/
async function createDepartment(parameters){
  let factory = getFactory();
  let newDepartment = factory.newResource('ch.supsi', 'Department', parameters.name);
  
  let assetRegistry = await getAssetRegistry('ch.supsiDepartment');
  await assetRegistry.add(newDepartment);
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
