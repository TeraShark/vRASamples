
var _host = RESTHostManager.createHost("dynamicRequest");
var host = RESTHostManager.createTransientHostFrom(_host);

host.operationTimeout = 60;
host.connectionTimeout = 30;

//Use this setting to ignore cert errors:
host.hostVerification = false;

/***********************      NOTE:      *************************
If this is the first time you are connecting to this REST Host, 
you must first import the certificate into vRO before you can establish a connection.
This is done by running the following Workflow in vRO:
name:       Import a certificate from URL
inputs:     enter the https://fqdn of the REST host
            select the checkbox "Will you accept a certificate with warnings?"
******************************************************************/

host.url = "https://cava8-vc-001350.sqa.local";

//requestBody would be populated with payload if you are using a POST as the requestMethod
var requestBody = null;
var requestMethod = "GET";
var request = host.createRequest(requestMethod, "/rest/vcenter/vm", requestBody);

// For Basic authentication: (I already have my basic token, so skipping in this sample)
//var authParams = ['Shared Session', username, password];
//var authenticationObject = RESTAuthenticationManager.createAuthentication('Basic', authParams);
//host.authentication = authenticationObject;

// Set Content Type
request.contentType = "application/json";
request.setHeader("Authorization", "Basic YWRtaW5pc3RyYXRvckB2c3BoZXJlLmxvY2FsOlZNd2FyZTEh");

// Execute REST Request
System.debug("REST Request: " + requestMethod + " " + request.fullUrl);
var response = request.execute();

// Output
var statusCodeAttribute = response.statusCode;
System.log("REST Response Status Code: " + statusCodeAttribute);
var responseAsString = response.contentAsString;

System.debug("REST Response Content: " + responseAsString);
