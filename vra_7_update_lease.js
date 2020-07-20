


System.sleep(5000);//Sleep 5s for token to register...

var RestHostFactory = System.getModule("com.vmware.pscoe.library.rest").RestHostFactory();
var RestClient = System.getModule("com.vmware.pscoe.library.rest").RestClient();

//https://us08-1-vralb.oc.vmware.com/catalog-service/api/consumer/resources/fab37afc-38ac-4646-8d01-ec1f74ddfabf/actions/a43ee0e3-3ff1-4565-a310-cd8d9ddb74f9/requests
var endpointUrl = "https://us08-1-vralb.oc.vmware.com";
var endpointName = "vRA";
var exp = new Date();
exp.setDate(exp.getDate() + 5);
var requestContent = {
    "type": "com.vmware.vcac.catalog.domain.request.CatalogResourceRequest",
    "resourceId": "17784e3d-80b6-4989-a52a-db0f68db6766",
    "actionId": "a43ee0e3-3ff1-4565-a310-cd8d9ddb74f9",
    "description": "Extend Lease",
    "reasons": "Required for testing",
    "data": {
        "provider-ExpirationDate": exp
    }
}

System.debug(token);

var restHost = RestHostFactory.newHostWithBasicAuth(endpointUrl, endpointName, "", ""); 
var restClient = new RestClient(restHost);

var request = {
    path: '/catalog-service/api/consumer/resources/17784e3d-80b6-4989-a52a-db0f68db6766/actions/a43ee0e3-3ff1-4565-a310-cd8d9ddb74f9/requests',
    params: [],
    content: requestContent,
    options: {
        skipEncodeParams: true,	
        returnResponseObject: true,		
        returnResponseObjectForReal: false, 	
        stringifyJsonContent: true,	
        interpretResponseCode: false,	
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control':'no-cache',
            'Authorization': 'Bearer ' + token
        },
        errorHandler: {					//Defines a retry mechanism in case of failed requests
            numberOfRetries: 3,			//Number of retries
            retryWaitInterval: 15,			//Polling interval in seconds
            errorsToRetry: ["Read timed out"]	//Specific errors to retry (Default: ["Connection pool shut down"])
        }
    }
};
System.debug("Requesting Extension for " + exp);
System.debug(JSON.stringify(requestContent));
//var urlTemplate = "workflows/{id}";

var httpData = restClient.post(request.path, request.params, request.content, request.options);
if (httpData.statusCode != 201){
    throw "Error calling API. Received Status Code: " + httpData.statusCode;
}
//var json = JSON.parse(httpData.contentAsString);
//System.log(access_token);



