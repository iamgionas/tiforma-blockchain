#!/bin/bash

### TEST DESCRIPTION ###
# This test assumes that every operation of creation, update and deletion of every asset and participant of the 
# network works properly.
#
# This test creates 3 Students: A, B and C.
# Student A is subscribed to StudyPlan1 and gets subscribed to Semester1 (thus, to StudentModule1).
# Student B is subscribed to StudyPlan1.
# Student C is not subscribed to a valid StudyPlan.
#
# Semester1 includes Studentmodule1, which includes Module1 which contains Course1.
# 
# TEST STEPS:
# 1) Subscribe Student A to Semester1.
# 2) A certification to Module1 is created for each student (A,B,C) and HAS TO WORK ONLY FOR STUDENT A.
# 3) Every student is subscribed to Semester1 and this step MUST NOT WORK FOR STUDENT C.




################################### DEFINING URL ###################################
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



################################### CREATION REQUESTS BODIES ###################################
create_course_1_body(){
    cat <<EOF
{
  "courseCode": "Course1",
  "name": "C1"
}
EOF
}

create_module_1_body(){
 cat <<EOF
{
  "moduleCode": "Module1",
  "name": "M1",
  "duration": 1,
  "ETCS": 1,
  "department": "resource:ch.supsi.Department#NULL",
  "state": "active",
  "responsables": [
    "resource:ch.supsi.Collaborator#NULL"
  ],
  "englishName": "test",
  "comment": "None.",
  "courses": [
    "resource:ch.supsi.Course#Course1"
  ]
}
EOF
}

create_studyplan_1_body(){
    cat <<EOF
{
  "name": "StudyPlan1",
  "department": "resource:ch.supsi.Department#NULL",
  "state": "so1",
  "comment": "sp1",
  "modules": [
    "resource:ch.supsi.Module#Module1"
  ]
}
EOF
}

create_studyplan_2_body(){
    cat <<EOF
{
  "name": "StudyPlan2",
  "department": "resource:ch.supsi.Department#NULL",
  "state": "so2",
  "comment": "sp2",
  "modules": [
    "resource:ch.supsi.Module#NULL"
  ]
}
EOF
}

create_studentmodule_1_body(){
    cat <<EOF
{
  "studentModuleID": "StudentModule1",
  "module": "resource:ch.supsi.Module#Module1",
  "students": ["resource:ch.supsi.Student#NULL"]
}
EOF
}

create_semester_1_body(){
cat <<EOF
{
  "name": "Semester1",
  "description": "Semester1",
  "modules": ["resource:ch.supsi.StudentModule#StudentModule1"]
}
EOF
}

create_semester_2_body(){
    cat <<EOF
{
  "name": "Semester2",
  "description": "Semester2",
  "modules": ["resource:ch.supsi.StudentModule#NULL"]
}
EOF
}

create_student_A_body(){
    cat <<EOF
{
  "contactID": "StudentA",
  "name": "STUDENT-A",
  "surname": "STUDENT-A",
  "addresses": [],
  "birthday": "2019-04-03T06:51:26.322Z",
  "nationality": "CH",
  "statute": "Immatricolato",
  "serialNumber": "00-000-000",
  "comment": "None.",
  "studyPlan": "resource:ch.supsi.StudyPlan#StudyPlan1"
}
EOF
}

create_student_B_body(){
    cat <<EOF
{
  "contactID": "StudentB",
  "name": "STUDENT-B",
  "surname": "STUDENT-B",
  "addresses": [],
  "birthday": "2019-04-03T06:51:26.322Z",
  "nationality": "CH",
  "statute": "Immatricolato",
  "serialNumber": "00-000-000",
  "comment": "None.",
  "studyPlan": "resource:ch.supsi.StudyPlan#StudyPlan1"
}
EOF
}

create_student_C_body(){
    cat <<EOF
{
  "contactID": "StudentC",
  "name": "STUDENT-C",
  "surname": "STUDENT-C",
  "addresses": [],
  "birthday": "2019-04-03T06:51:26.322Z",
  "nationality": "CH",
  "statute": "Immatricolato",
  "serialNumber": "00-000-000",
  "comment": "None.",
  "studyPlan": "resource:ch.supsi.StudyPlan#StudyPlan2"
}
EOF
}


















################################### CREATION METHODS ###################################

create_course_1(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_course_1_body)" "${HOST}/CreateCourse" | grep Error
}

create_module_1(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_module_1_body)" "${HOST}/CreateModule" | grep Error
}

create_studyplan_1(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_studyplan_1_body)" "${HOST}/CreateStudyPlan" | grep Error
}

create_studyplan_2(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_studyplan_2_body)" "${HOST}/CreateStudyPlan" | grep Error
}

create_studentmodule_1(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_studentmodule_1_body)" "${HOST}/CreateStudentModule" | grep Error
}

create_semester_1(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_semester_1_body)" "${HOST}/CreateSemester" | grep Error
}

create_semester_2(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_semester_2_body)" "${HOST}/CreateSemester" | grep Error
}

create_student_A(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_student_A_body)" "${HOST}/CreateStudent" | grep Error
}

create_student_B(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_student_B_body)" "${HOST}/CreateStudent" | grep Error
}

create_student_C(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_student_C_body)" "${HOST}/CreateStudent" | grep Error
}


















################################### OPERATION METHODS ###################################
subscribe_student_a_to_semester1_body(){
    cat <<EOF
{
  "student": "resource:ch.supsi.Student#StudentA",
  "semester": "resource:ch.supsi.Semester#Semester1"
}
EOF
}

subscribe_student_a_to_semester1(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(subscribe_student_a_to_semester1_body)" "${HOST}/SubscriptionToSemester" | grep Error
}

certificate_student_a_body(){
    cat <<EOF
{
  "certificationID": "StudentA-Certification",
  "module": "resource:ch.supsi.Module#Module1",
  "student": "resource:ch.supsi.Student#StudentA",
  "grade": 1
}
EOF
}

certificate_student_b_body(){
    cat <<EOF
{
  "certificationID": "StudentB-Certification",
  "module": "resource:ch.supsi.Module#Module1",
  "student": "resource:ch.supsi.Student#StudentB",
  "grade": 2
}
EOF
}

certificate_student_c_body(){
    cat <<EOF
{
  "certificationID": "StudentC-Certification",
  "module": "resource:ch.supsi.Module#Module1",
  "student": "resource:ch.supsi.Student#StudentC",
  "grade": 3
}
EOF
}

certificate_all_students(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(certificate_student_a_body)" "${HOST}/CreateCertification" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(certificate_student_b_body)" "${HOST}/CreateCertification" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(certificate_student_c_body)" "${HOST}/CreateCertification" | grep Error
}

subscribe_student_b_to_semester1_body(){
    cat <<EOF
{
  "student": "resource:ch.supsi.Student#StudentB",
  "semester": "resource:ch.supsi.Semester#Semester1"
}
EOF
}

subscribe_student_c_to_semester1_body(){
    cat <<EOF
{
  "student": "resource:ch.supsi.Student#StudentC",
  "semester": "resource:ch.supsi.Semester#Semester1"
}
EOF
}

subscribe_b_and_c_to_semester1(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(subscribe_student_b_to_semester1_body)" "${HOST}/SubscriptionToSemester" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(subscribe_student_c_to_semester1_body)" "${HOST}/SubscriptionToSemester" | grep Error
}

certificate_b_and_c(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(certificate_student_b_body)" "${HOST}/CreateCertification" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(certificate_student_c_body)" "${HOST}/CreateCertification" | grep Error
}











################################### DELETION METHODS ###################################
delete_student_a_body(){
cat <<EOF
{
  "student": "resource:ch.supsi.Student#StudentA"
}
EOF
}

delete_student_b_body(){
cat <<EOF
{
  "student": "resource:ch.supsi.Student#StudentB"
}
EOF
}

delete_student_c_body(){
cat <<EOF
{
  "student": "resource:ch.supsi.Student#StudentC"
}
EOF
}

delete_course_body(){
    cat <<EOF
{
  "course": "resource:ch.supsi.Course#Course1"
}
EOF
}

delete_module_body(){
    cat <<EOF
{
  "module": "resource:ch.supsi.Module#Module1"
}
EOF
}

delete_studyplan_1_body(){
    cat <<EOF
{
  "studyplan": "resource:ch.supsi.StudyPlan#StudyPlan1"
}
EOF
}

delete_studyplan_2_body(){
    cat <<EOF
{
  "studyplan": "resource:ch.supsi.StudyPlan#StudyPlan2"
}
EOF
}

delete_semester_body(){
    cat <<EOF
{
  "semester": "resource:ch.supsi.Semester#Semester1"
}
EOF
}

delete_studentmodule_body(){
    cat <<EOF
{
  "studentmodule": "resource:ch.supsi.StudentModule#StudentModule1"
}
EOF
}

delete_certification_a_body(){
    cat <<EOF
{
  "certification": "resource:ch.supsi.Certification#StudentA-Certification"
}
EOF
}

delete_certification_b_body(){
    cat <<EOF
{
  "certification": "resource:ch.supsi.Certification#StudentB-Certification"
}
EOF
}

delete_everything(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_student_a_body)" "${HOST}/DeleteStudent" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_student_b_body)" "${HOST}/DeleteStudent" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_student_c_body)" "${HOST}/DeleteStudent" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_course_body)" "${HOST}/DeleteCourse" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_module_body)" "${HOST}/DeleteModule" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_studyplan_1_body)" "${HOST}/DeleteStudyPlan" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_studyplan_2_body)" "${HOST}/DeleteStudyPlan" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_semester_body)" "${HOST}/DeleteSemester" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_studentmodule_body)" "${HOST}/DeleteStudentModule" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_certification_a_body)" "${HOST}/DeleteCertification" | grep Error

    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_certification_b_body)" "${HOST}/DeleteCertification" | grep Error
}












################################### MAIN TEST ###################################
echo "Starting main test. \nCreating schema...\n\n"
create_course_1
create_module_1
create_studyplan_1
create_studyplan_2
create_studentmodule_1
create_semester_1
create_student_A
create_student_B
create_student_C

echo "All assets & participants created.\n\n"
echo "You can check the assets on the browser (localhost:300). Press enter to continue.\n\n"
read anything

echo "Subscribing student A to Semester1.\n\n"
subscribe_student_a_to_semester1
echo "Student A should be subscribed to studentmodule1. Press enter to continue.\n\n"
read anything

echo "Trying to certificate students A, B, and C on module1.\n\n"
certificate_all_students
echo "Only Certification for student A should exist. Press enter to continue.\n\n"
read anything

echo "Subscribing students B and C to semester1.\n\n"
subscribe_b_and_c_to_semester1
echo "Only student b should be subscribed to studentmodule1. Press enter to continue.\n\n"
read anything

echo "Certificating all students once more.\n\n"
certificate_b_and_c
echo "Now, also student B should have a certification on Module1.\n\n"
echo "Press enter to conclude main test."
read anything

delete_everything