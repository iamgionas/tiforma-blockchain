#!/bin/bash

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible certificationsession.
create_certificationsession_body(){
    cat <<EOF
{
  "name": "TEST-CERTIFICATIONSESSION-ID",
  "department": "resource:ch.supsi.Department#CREATION",
  "semester": "resource:ch.supsi.Semester#CREATION",
  "title": "CREATION SUCCESSFUL",
  "date": "2019-04-03T06:51:26.263Z",
  "subscribers": [
    "resource:ch.supsi.Certification#CREATION"
  ]
}
EOF
}


update_certificationsession_body(){
    cat <<EOF
{
  "oldCertificationSession": "resource:ch.supsi.CertificationSession#TEST-CERTIFICATIONSESSION-ID",
  "department": "resource:ch.supsi.Department#UPDATE",
  "semester": "resource:ch.supsi.Semester#UPDATE",
  "title": "UPDATE SUCCESSFUL",
  "date": "2019-04-03T06:51:26.732Z",
  "subscribers": [
    "resource:ch.supsi.Certification#UPDATE"
  ]
}
EOF
}


delete_certificationsession_body(){
    cat <<EOF
{
  "certificationsession": "resource:ch.supsi.CertificationSession#TEST-CERTIFICATIONSESSION-ID"
}
EOF
}

#Creation of a certificationsession.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_certificationsession(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_certificationsession_body)" "${HOST}/CreateCertificationSession"
}

#Update of a certificationsession.
#Note that an own implementation of a transaction is tested, and not a standard API asset update.
update_certificationsession(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(update_certificationsession_body)" "${HOST}/UpdateCertificationSession"
}



#Deletion of a certificationsession.
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_certificationsession(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_certificationsession_body)" "${HOST}/DeleteCertificationSession"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/CertificationSession" | grep TEST-CERTIFICATIONSESSION-ID
echo "\n\n\n"

#Creation of a certificationsession
echo "Creating a certificationsession"
create_certificationsession
echo "\n\n\n"

#Checking if the certificationsession is present
echo "Checking if the certificationsession is present"
curl "${HOST}/CertificationSession" | grep TEST-CERTIFICATIONSESSION-ID
echo "\n\n\n"

#Update of a certificationsession
echo "Updating a certificationsession"
update_certificationsession
echo "\n\n\n"

#Checking if the certificationsession was updated
echo "Checking if the certificationsession was updated"
curl "${HOST}/CertificationSession" | grep TEST-CERTIFICATIONSESSION-ID
echo "\n\n\n"

#Deleting the certificationsession
echo "Deleting the certificationsession"
delete_certificationsession
echo "\n\n\n"

#Checking if the certificationsession was deleted
echo "Checking if the certificationsession was deleted"
curl "${HOST}/CertificationSession" | grep TEST-CERTIFICATIONSESSION-ID
echo "\n\n\n"