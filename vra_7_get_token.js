
var RestHostFactory = System.getModule("com.vmware.pscoe.library.rest").RestHostFactory();
var RestClient = System.getModule("com.vmware.pscoe.library.rest").RestClient();


//https://us08-1-vralb.oc.vmware.com/identity/api/tokens

var endpointUrl = "https://us08-1-vralb.oc.vmware.com";
var endpointName = "vRA";
var requestContent = {"username":"<username>","password":"<password>","tenant":"<tenant>"};


var restHost = RestHostFactory.newHostWithBasicAuth(endpointUrl, endpointName, "", ""); 
var restClient = new RestClient(restHost);

var request = {
    path: '/identity/api/tokens',
    params: [],
    content: requestContent,
    options: {
        skipEncodeParams: true,	
        returnResponseObject: true,		
        returnResponseObjectForReal: false, 	
        stringifyJsonContent: true,	
        interpretResponseCode: true,	
        headers: {
            //'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Cache-Control':'no-cache'
        },
        errorHandler: {					//Defines a retry mechanism in case of failed requests
            numberOfRetries: 3,			//Number of retries
            retryWaitInterval: 15,			//Polling interval in seconds
            errorsToRetry: ["Read timed out"]	//Specific errors to retry (Default: ["Connection pool shut down"])
        }
    }
};
System.debug("Calling Auth API...");

var httpData = restClient.post(request.path, request.params, request.content, request.options);
if (httpData.statusCode != 200){
    throw "Error calling API. Received Status Code: " + httpData.statusCode;
}
System.debug(httpData.statusCode);
//System.debug(httpData.contentLength);

var response = JSON.parse(httpData.contentAsString);
System.debug("Obtained API Access Token...");
//System.debug(response.token.toString());
token = response.id;

