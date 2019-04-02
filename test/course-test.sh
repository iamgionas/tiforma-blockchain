#!/bin/bash

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible course.
create_course_body(){
    cat <<EOF
{
  "courseCode": "TEST-COURSE-CODE",
  "name": "TEST-COURSE-NAME"
}
EOF
}

#Utility function to get a second JSON of a possible course.
update_course_body(){
    cat <<EOF
{
  "oldCourse": "resource:ch.supsi.Course#TEST-COURSE-CODE",
  "name" : "TEST-COURSE-NAME-2"
}
EOF
}

delete_course_body(){
    cat <<EOF
{
  "course": "resource:ch.supsi.Course#TEST-COURSE-CODE"
}
EOF
}

#Creation of a course.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_course(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_course_body)" "${HOST}/CreateCourse"
}


#Update of a course
#Note that an own implementation of a transaction is tested, and not a standard API asset update.
update_course(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(update_course_body)" "${HOST}/UpdateCourse"
}


#Deletion of a course
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_course(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_course_body)" "${HOST}/DeleteCourse"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/Course" | grep TEST-COURSE-CODE
echo "\n\n\n"

#Creation of a course
echo "Creating a course"
create_course
echo "\n\n\n"

#Checking if the course is present
echo "Checking if the course is present"
curl "${HOST}/Course" | grep TEST-COURSE-CODE
echo "\n\n\n"

#Updating the course
echo "Updating the course"
update_course
echo "\n\n\n"

#Checking if the course was updated
echo "Checking if course was updated"
curl "${HOST}/Course" | grep TEST-COURSE-MODIFIED
echo "\n\n\n"

#Deleting the course
echo "Deleting the course"
delete_course
echo "\n\n\n"

#Checking if the course was deleted
echo "Checking if the course was deleted"
curl "${HOST}/Course" | grep TEST-COURSE-MODIFIED
echo "\n\n\n"