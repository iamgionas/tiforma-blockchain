#!/bin/bash

#Please note that when this test was made, the DEPARTMENT ASSET included no attributes but the name, which is also its id.
#For this reason, no implementation of updates were made and thus no tests on updates as well.

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible department.
create_department_body(){
    cat <<EOF
{
    "name" : "TEST-DEPARTMENT-ID"
}
EOF
}

delete_department_body(){
    cat <<EOF
{
  "department": "resource:ch.supsi.Department#TEST-DEPARTMENT-ID"
}
EOF
}

#Creation of a department.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_department(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_department_body)" "${HOST}/CreateDepartment"
}


#Deletion of a department.
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_department(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_department_body)" "${HOST}/DeleteDepartment"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/Department" | grep TEST-DEPARTMENT-ID
echo "\n\n\n"

#Creation of a department
echo "Creating a department"
create_department
echo "\n\n\n"

#Checking if the department is present
echo "Checking if the department is present"
curl "${HOST}/Department" | grep TEST-DEPARTMENT-ID
echo "\n\n\n"

#Deleting the department
echo "Deleting the department"
delete_department
echo "\n\n\n"

#Checking if the department was deleted
echo "Checking if the department was deleted"
curl "${HOST}/Department" | grep TEST-DEPARTMENT-ID
echo "\n\n\n"