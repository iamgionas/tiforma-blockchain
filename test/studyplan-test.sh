#!/bin/bash

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible studyplan.
create_studyplan_body(){
    cat <<EOF
{
  "name": "TEST-STUDYPLAN-ID",
  "department": "resource:ch.supsi.Department#NULL",
  "state": "CREATION SUCCESSFUL",
  "comment": "CREATION SUCCESSFUL",
  "modules": [
    "resource:ch.supsi.Module#NULL"
  ]
}
EOF
}


update_studyplan_body(){
    cat <<EOF
{
  "oldStudyPlan": "resource:ch.supsi.StudyPlan#TEST-STUDYPLAN-ID",
  "department": "resource:ch.supsi.Department#UPDATED",
  "state": "UPDATE SUCCESSFUL",
  "comment": "UPDATE SUCCESSFUL",
  "modules": [
    "resource:ch.supsi.Module#UPDATED"
  ]
}
EOF
}


delete_studyplan_body(){
    cat <<EOF
{
  "studyplan": "resource:ch.supsi.StudyPlan#TEST-STUDYPLAN-ID"
}
EOF
}

#Creation of a studyplan.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_studyplan(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_studyplan_body)" "${HOST}/CreateStudyPlan"
}

#Update of a studyplan.
#Note that an own implementation of a transaction is tested, and not a standard API asset update.
update_studyplan(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(update_studyplan_body)" "${HOST}/UpdateStudyPlan"
}



#Deletion of a studyplan.
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_studyplan(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_studyplan_body)" "${HOST}/DeleteStudyPlan"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/StudyPlan" | grep TEST-STUDYPLAN-ID
echo "\n\n\n"

#Creation of a studyplan
echo "Creating a studyplan"
create_studyplan
echo "\n\n\n"

#Checking if the studyplan is present
echo "Checking if the studyplan is present"
curl "${HOST}/StudyPlan" | grep TEST-STUDYPLAN-ID
echo "\n\n\n"

#Update of a studyplan
echo "Updating a studyplan"
update_studyplan
echo "\n\n\n"

#Checking if the studyplan was updated
echo "Checking if the studyplan was updated"
curl "${HOST}/StudyPlan" | grep TEST-STUDYPLAN-ID
echo "\n\n\n"

#Deleting the studyplan
echo "Deleting the studyplan"
delete_studyplan
echo "\n\n\n"

#Checking if the studyplan was deleted
echo "Checking if the studyplan was deleted"
curl "${HOST}/StudyPlan" | grep TEST-STUDYPLAN-ID
echo "\n\n\n"