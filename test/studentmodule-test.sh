#!/bin/bash

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible studentmodule.
create_studentmodule_body(){
    cat <<EOF
{
  "studentModuleID": "TEST-STUDENTMODULE-ID",
  "module": "resource:ch.supsi.Module#NULL",
  "students": ["resource:ch.supsi.Student#NULL"]
}
EOF
}


update_studentmodule_body(){
    cat <<EOF
{
  "oldStudentModule": "resource:ch.supsi.StudentModule#TEST-STUDENTMODULE-ID",
  "module": "resource:ch.supsi.Module#UPDATED",
  "students": [
    "resource:ch.supsi.Student#UPDATED"
  ]
}
EOF
}


delete_studentmodule_body(){
    cat <<EOF
{
  "studentmodule": "resource:ch.supsi.StudentModule#TEST-STUDENTMODULE-ID"
}
EOF
}

#Creation of a studentmodule.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_studentmodule(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_studentmodule_body)" "${HOST}/CreateStudentModule"
}

#Update of a studentmodule.
#Note that an own implementation of a transaction is tested, and not a standard API asset update.
update_studentmodule(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(update_studentmodule_body)" "${HOST}/UpdateStudentModule"
}



#Deletion of a studentmodule.
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_studentmodule(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_studentmodule_body)" "${HOST}/DeleteStudentModule"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/StudentModule" | grep TEST-STUDENTMODULE-ID
echo "\n\n\n"

#Creation of a studentmodule
echo "Creating a studentmodule"
create_studentmodule
echo "\n\n\n"

#Checking if the studentmodule is present
echo "Checking if the studentmodule is present"
curl "${HOST}/StudentModule" | grep TEST-STUDENTMODULE-ID
echo "\n\n\n"

#Update of a studentmodule
echo "Updating a studentmodule"
update_studentmodule
echo "\n\n\n"

#Checking if the studentmodule was updated
echo "Checking if the studentmodule was updated"
curl "${HOST}/StudentModule" | grep TEST-STUDENTMODULE-ID
echo "\n\n\n"

#Deleting the studentmodule
echo "Deleting the studentmodule"
delete_studentmodule
echo "\n\n\n"

#Checking if the studentmodule was deleted
echo "Checking if the studentmodule was deleted"
curl "${HOST}/StudentModule" | grep TEST-STUDENTMODULE-ID
echo "\n\n\n"