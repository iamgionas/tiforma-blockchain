#!/bin/bash

#Population script that populates the SUPSI Tiforma platform with real looking datas.

HOST="http://localhost:3000/api"

################################### COURSES ###################################
create_course(){
    curl -d '{"courseCode": "'"$1"'", "name": "'"$2"'"}' -H "Content-Type: application/json" -X POST "${HOST}/CreateCourse"
}

################################### MODULES ###################################
create_module(){
    curl -d '{"moduleCode":"'"$1"'", "name":"'"$2"'", "duration":"'"$3"'", "ETCS": "'"$4"'", "department" : "resource:ch.supsi.Department#DTI", "state": "attivo", "courses": [] }' -H "Content-Type: application/json" -X POST "${HOST}/CreateModule"
}

add_course_to_module(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "ch.supsi.AddCourseToModule", 
   "course": "resource:ch.supsi.Course#'"$1"'", 
   "module": "resource:ch.supsi.Module#'"$2"'"  
 }' "${HOST}/AddCourseToModule"
}

################################### DEPARTMENTS ###################################
create_department(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "ch.supsi.CreateDepartment", 
    "departmentID": "'"$1"'", 
    "name": "'"$1"'" 
    }' "${HOST}/CreateDepartment"
}

################################### STUDENTS ###################################
create_student(){
    curl -d '{"contactID":"'"$1"'", "name":"'"$2"'", "surname":"'"$3"'", "birthday":"2019-05-16T00:00:00.0Z", "nationality":"swiss", "statute":"Immatricolato", "studyPlan": "resource:ch.supsi.StudyPlan#Ingegneria informatica TP", "serialNumber": "'"$4"'"}' -H "Content-Type: application/json" -X POST "${HOST}/CreateStudent"
}

################################### STUDYPLANS ###################################
create_studyPlan(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "ch.supsi.CreateStudyPlan", 
   "name": "'"$1"'",
   "department": "resource:ch.supsi.Department#'"$2"'", 
   "state": "Attivo", 
   "comment": "Nessuno.", 
   "modules": [] 
 }' "${HOST}/CreateStudyPlan"
}

add_module_to_studyPlan(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{
   "$class": "ch.supsi.AddModuleToStudyPlan",
   "module": "resource:ch.supsi.Module#'"$1"'",
   "studyplan": "resource:ch.supsi.StudyPlan#'"$2"'"
 }' "${HOST}/AddModuleToStudyPlan"
}

################################### STUDENTMODULES ###################################
create_studentModule(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "ch.supsi.CreateStudentModule", 
   "studentModuleID": "'"$1"'", 
   "module": "resource:ch.supsi.Module#'"$2"'", 
   "students": [] 
    }' "${HOST}/CreateStudentModule"
}

################################### SEMESTERS ###################################
create_semester(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
   "$class": "ch.supsi.CreateSemester", 
   "name": "'"$1"'", 
   "description": "'"$2"'", 
   "modules": [] 
    }' "${HOST}/CreateSemester"
}

add_studentModule_to_semester(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "ch.supsi.AddStudentModuleToSemester", 
    "studentModule": "resource:ch.supsi.StudentModule#'"$1"'", 
    "semester": "resource:ch.supsi.Semester#'"$2"'" 
    }' "${HOST}/AddStudentModuleToSemester"
}

subscribe_student_to_semester(){
    curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ 
    "$class": "ch.supsi.SubscriptionToSemester", 
    "student": "resource:ch.supsi.Student#'"$1"'", 
    "semester": "resource:ch.supsi.Semester#'"$2"'" 
    }' "${HOST}/SubscriptionToSemester"
}

################################### CERTIFICATIONS ###################################

################################### CERTIFICATION SESSIONS ###################################




################################### MAIN ###################################

create_course "C08003" "Algoritmi avanzati" | grep Error
create_course "C08004" "Ottimizzazione" | grep Error
create_course "C02055" "Applicazioni distribuite" | grep Error
create_course "C02057" "System management" | grep Error
create_course "C02054" "Seminari" | grep Error
create_course "C02056" "Applicazioni service oriented" | grep Error
create_course "C07013" "Economia aziendale 2" | grep Error
create_course "C02059" "Reti telematiche" | grep Error
create_course "C02068" "Realtà virtuale" | grep Error

create_module "M02043" "Applicazioni distribuite" 1 6 | grep Error
create_module "M02044" "System management" 1 6 | grep Error
create_module "M02055" "Realtà virtuale" 1 6 | grep Error
create_module "M07007" "Economia aziendale 2" 1 6 | grep Error
create_module "M08002" "Algoritmi avanzati e ottimizzazione" 1 6 | grep Error

add_course_to_module "C08003" "M08002" | grep Error
add_course_to_module "C08004" "M08002" | grep Error
add_course_to_module "C02055" "M02043" | grep Error
add_course_to_module "C02057" "M02044" | grep Error
add_course_to_module "C02056" "M02043" | grep Error
add_course_to_module "C07013" "M07007" | grep Error

create_department "DTI" | grep Error
create_department "DEASS" | grep Error
create_department "DACD" | grep Error
create_department "DFA" | grep Error

create_studyPlan "Ingegneria informatica TP" "DTI" | grep Error

add_module_to_studyPlan "M02043" "Ingegneria informatica TP" | grep Error
add_module_to_studyPlan "M02044" "Ingegneria informatica TP" | grep Error
add_module_to_studyPlan "M02055" "Ingegneria informatica TP" | grep Error
add_module_to_studyPlan "M07007" "Ingegneria informatica TP" | grep Error
add_module_to_studyPlan "M08002" "Ingegneria informatica TP" | grep Error

create_studentModule "SM03806" "M02043" | grep Error
create_studentModule "SM03807" "M02044" | grep Error
create_studentModule "SM03808" "M02055" | grep Error
create_studentModule "SM03809" "M07007" | grep Error
create_studentModule "SM03810" "M08002" | grep Error

create_semester "Semestre Primaverile 2019 - Informatica TP" "Semestre primaverile 2019 per gli studenti di ingegneria informatica a tempo pieno del terzo anno." | grep Error

add_studentModule_to_semester "SM03806" "Semestre Primaverile 2019 - Informatica TP" | grep Error
add_studentModule_to_semester "SM03807" "Semestre Primaverile 2019 - Informatica TP" | grep Error
add_studentModule_to_semester "SM03808" "Semestre Primaverile 2019 - Informatica TP" | grep Error
add_studentModule_to_semester "SM03809" "Semestre Primaverile 2019 - Informatica TP" | grep Error
add_studentModule_to_semester "SM03810" "Semestre Primaverile 2019 - Informatica TP" | grep Error

create_student "S83934" "Brian" "Pulfer" "16-682-080" | grep Error
create_student "S06739" "Gionas" "Bonardi" "16-682-081" | grep Error
create_student "S09263" "Olmo" "Barberis" "16-682-082" | grep Error
create_student "S82916" "Patrick" "Valnegri" "16-682-083" | grep Error
create_student "S36890" "Kevin" "Dominguez" "16-682-084" | grep Error
create_student "S94739" "Nicholas" "Sala" "16-682-085" | grep Error
create_student "S02836" "Ivan" "Pavic" "16-682-086" | grep Error
create_student "S74666" "Tommaso" "Agnola" "16-682-087" | grep Error
create_student "S45672" "Elia" "Perrone" "16-682-088" | grep Error

subscribe_student_to_semester "S83934" "Semestre Primaverile 2019 - Informatica TP" | grep Error
subscribe_student_to_semester "S06739" "Semestre Primaverile 2019 - Informatica TP" | grep Error
subscribe_student_to_semester "S09263" "Semestre Primaverile 2019 - Informatica TP" | grep Error
subscribe_student_to_semester "S82916" "Semestre Primaverile 2019 - Informatica TP" | grep Error
subscribe_student_to_semester "S36890" "Semestre Primaverile 2019 - Informatica TP" | grep Error
subscribe_student_to_semester "S94739" "Semestre Primaverile 2019 - Informatica TP" | grep Error
subscribe_student_to_semester "S02836" "Semestre Primaverile 2019 - Informatica TP" | grep Error
subscribe_student_to_semester "S74666" "Semestre Primaverile 2019 - Informatica TP" | grep Error
subscribe_student_to_semester "S45672" "Semestre Primaverile 2019 - Informatica TP" | grep Error