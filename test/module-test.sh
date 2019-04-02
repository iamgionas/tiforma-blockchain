#!/bin/bash

#Defining the host depending on the option selected
HOST="http://localhost:3000/api"

if [[ $1 == -n ]] || [[ $1 == -namespaces ]]; then
    HOST="http://localhost:3000/ch.supsi."
    echo "Using namespace."
    echo "New host is ${HOST}"
fi



#Utility function to get the JSON format of a possible module.
create_module_body(){
    cat <<EOF
{
  "moduleCode": "MODULE-ID",
  "name": "TEST-MODULE-CODE",
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
    "resource:ch.supsi.Course#NULL"
  ]
}
EOF
}

#Utility function to get a second JSON of a possible module.
update_module_body(){
    cat <<EOF
{
  "oldModule" : "resource:ch.supsi.Module#MODULE-ID",
  "name": "TEST-MODULE-CODE-2",
  "duration": 2,
  "ETCS": 2,
  "department": "resource:ch.supsi.Department#NULL",
  "state": "active",
  "responsables": [
    "resource:ch.supsi.Collaborator#NULL"
  ],
  "englishName": "test",
  "comment": "None.",
  "courses": [
    "resource:ch.supsi.Course#NULL"
  ]
}
EOF
}

delete_module_body(){
    cat <<EOF
{
  "module": "resource:ch.supsi.Module#MODULE-ID"
}
EOF
}

#Creation of a module.
#curl command sends a request. -H defines a header. -X POST chooses the method. --data sets the request's body.
#Note that an own implementation of a transaction is tested, and not a standard API asset creation.
create_module(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(create_module_body)" "${HOST}/CreateModule"
}


#Update of a module.
#Note that an own implementation of a transaction is tested, and not a standard API asset update.
update_module(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(update_module_body)" "${HOST}/UpdateModule"
}


#Deletion of a module.
#Note that an own implementation of a transaction is tested, and not a standard API asset deletion.
delete_module(){
    curl \
    -H "Content-Type: application/json" \
    -X POST --data "$(delete_module_body)" "${HOST}/DeleteModule"
}




######################################## TESTS STARTS HERE ########################################
#Printing the host name
echo "Host name:  ${HOST}"
echo "\n\n\n"

#Sends a GET request to check if the REST SERVER is up.
echo "Pinging REST SERVER"
curl "${HOST}/Module" | grep TEST-MODULE-CODE
echo "\n\n\n"

#Creation of a module
echo "Creating a module"
create_module
echo "\n\n\n"

#Checking if the module is present
echo "Checking if the module is present"
curl "${HOST}/Module" | grep TEST-MODULE-CODE
echo "\n\n\n"

#Updating the module
echo "Updating the module"
update_module
echo "\n\n\n"

#Checking if the module was updated
echo "Checking if module was updated"
curl "${HOST}/Module" | grep TEST-MODULE-CODE
echo "\n\n\n"

#Deleting the module
echo "Deleting the module"
delete_module
echo "\n\n\n"

#Checking if the module was deleted
echo "Checking if the module was deleted"
curl "${HOST}/Module" | grep TEST-MODULE-CODE
echo "\n\n\n"