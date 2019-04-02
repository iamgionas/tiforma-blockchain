The back-end tests of the tiforma application verify that all of the exposed REST APIs work as they should.

Please note that the requests URLs to the REST API server change depending on how the rest-server was created (using namespaces or not).
For this particular reason, a parameter for each test might be recuired.

The tests consists of a set of shell scripts that actuate HTTP requests using CURL and then checking the returned value by these commands.