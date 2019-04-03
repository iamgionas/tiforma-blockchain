#!/bin/bash

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible semester.
create_semester_body(){
    cat <<EOF
{
  "name": "TEST-SEMESTER-ID",
  "description": "CREATION SUCCESSFULL",
  "modules": ["resource:ch.supsi.StudentModule#NULL"]
}
EOF
}


update_semester_body(){
    cat <<EOF
{
  "oldSemester": "resource:ch.supsi.Semester#TEST-SEMESTER-ID",
  "description": "UPDATE SUCCESSFULL",
  "modules": ["resource:ch.supsi.StudentModule#NULL"]
}
EOF
}


delete_semester_body(){
    cat <<EOF
{
  "semester": "resource:ch.supsi.Semester#TEST-SEMESTER-ID"
}
EOF
}

#Creation of a semester.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_semester(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_semester_body)" "${HOST}/CreateSemester"
}

#Update of a semester.
#Note that an own implementation of a transaction is tested, and not a standard API asset update.
update_semester(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(update_semester_body)" "${HOST}/UpdateSemester"
}



#Deletion of a semester.
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_semester(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_semester_body)" "${HOST}/DeleteSemester"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/Semester" | grep TEST-SEMESTER-ID
echo "\n\n\n"

#Creation of a semester
echo "Creating a semester"
create_semester
echo "\n\n\n"

#Checking if the semester is present
echo "Checking if the semester is present"
curl "${HOST}/Semester" | grep TEST-SEMESTER-ID
echo "\n\n\n"

#Update of a semester
echo "Updating a semester"
update_semester
echo "\n\n\n"

#Checking if the semester was updated
echo "Checking if the semester was updated"
curl "${HOST}/Semester" | grep TEST-SEMESTER-ID
echo "\n\n\n"

#Deleting the semester
echo "Deleting the semester"
delete_semester
echo "\n\n\n"

#Checking if the semester was deleted
echo "Checking if the semester was deleted"
curl "${HOST}/Semester" | grep TEST-SEMESTER-ID
echo "\n\n\n"