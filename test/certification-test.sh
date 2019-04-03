#!/bin/bash


###### IMPORTANT ######
# This file only tests if the connection to every API method is successful and does not test that a certification 
# cannot be created if the student does not own the module in his study plan and if the student is not subscribed
# to a student module which module is the module being certified.
# These tests are executed in the main-test.sh

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible certification.
create_certification_body(){
    cat <<EOF
{
  "certificationID": "TEST-CERTIFICATION-ID",
  "module": "resource:ch.supsi.Module#CREATE",
  "student": "resource:ch.supsi.Student#CREATE",
  "grade": 1
}
EOF
}


update_certification_body(){
    cat <<EOF
{
  "oldCertification": "resource:ch.supsi.Certification#TEST-CERTIFICATION-ID",
  "module": "resource:ch.supsi.Module#UPDATE",
  "student": "resource:ch.supsi.Student#UPDATE",
  "grade": 2
}
EOF
}


delete_certification_body(){
    cat <<EOF
{
  "certification": "resource:ch.supsi.Certification#TEST-CERTIFICATION-ID"
}
EOF
}

#Creation of a certification.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_certification(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_certification_body)" "${HOST}/CreateCertification"
}

#Update of a certification.
#Note that an own implementation of a transaction is tested, and not a standard API asset update.
update_certification(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(update_certification_body)" "${HOST}/UpdateCertification"
}



#Deletion of a certification.
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_certification(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_certification_body)" "${HOST}/DeleteCertification"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/Certification" | grep TEST-CERTIFICATION-ID
echo "\n\n\n"

#Creation of a certification
echo "Creating a certification"
create_certification        #This creation should fail 
echo "\n\n\n"

#Checking if the certification is present
echo "Checking if the certification is present"
curl "${HOST}/Certificaiton" | grep TEST-CERTIFICATION-ID
echo "\n\n\n"

#Update of a certification
echo "Updating a certification"
update_certification
echo "\n\n\n"

#Checking if the certification was updated
echo "Checking if the certification was updated"
curl "${HOST}/Certification" | grep TEST-CERTIFICATION-ID
echo "\n\n\n"

#Deleting the certification
echo "Deleting the certification"
delete_certification
echo "\n\n\n"

#Checking if the certification was deleted
echo "Checking if the certification was deleted"
curl "${HOST}/Certification" | grep statusCode #should be 500 since the creation should fail.
echo "\n\n\n"