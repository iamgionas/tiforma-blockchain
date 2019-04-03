#!/bin/bash

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible student.
create_student_body(){
    cat <<EOF
{
  "contactID": "TEST-STUDENT-ID",
  "name": "TEST-STUDENT-NAME",
  "surname": "TEST-STUDENT-SURNAME",
  "addresses": [],
  "birthday": "2019-04-03T06:51:26.322Z",
  "nationality": "CH",
  "statute": "Immatricolato",
  "serialNumber": "00-000-000",
  "comment": "None.",
  "studyPlan": "resource:ch.supsi.StudyPlan#NULL"
}
EOF
}


update_student_body(){
    cat <<EOF
{
  "oldStudent": "resource:ch.supsi.Student#TEST-STUDENT-ID",
  "name": "UPDATE SUCCESSFULL",
  "surname": "UPDATE SUCCESSFULL",
  "addresses": [],
  "birthday": "2019-04-03T06:51:26.779Z",
  "nationality": "UPDATE SUCCESSFULL",
  "statute": "UPDATE SUCCESSFULL",
  "serialNumber": "UPDATE SUCCESSFULL",
  "comment": "UPDATE SUCCESSFULL",
  "studyPlan": "resource:ch.supsi.StudyPlan#NULL"
}
EOF
}


delete_student_body(){
    cat <<EOF
{
  "student": "resource:ch.supsi.Student#TEST-STUDENT-ID"
}
EOF
}

#Creation of a student.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_student(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_student_body)" "${HOST}/CreateStudent"
}

#Update of a student.
#Note that an own implementation of a transaction is tested, and not a standard API asset update.
update_student(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(update_student_body)" "${HOST}/UpdateStudent"
}



#Deletion of a student.
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_student(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_student_body)" "${HOST}/DeleteStudent"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/Student" | grep TEST-STUDENT-ID
echo "\n\n\n"

#Creation of a student
echo "Creating a student"
create_student
echo "\n\n\n"

#Checking if the student is present
echo "Checking if the student is present"
curl "${HOST}/Student" | grep TEST-STUDENT-ID
echo "\n\n\n"

#Update of a student
echo "Updating a student"
update_student
echo "\n\n\n"

#Checking if the student was updated
echo "Checking if the student was updated"
curl "${HOST}/Student" | grep TEST-STUDENT-ID
echo "\n\n\n"

#Deleting the student
echo "Deleting the student"
delete_student
echo "\n\n\n"

#Checking if the student was deleted
echo "Checking if the student was deleted"
curl "${HOST}/Student" | grep TEST-STUDENT-ID
echo "\n\n\n"