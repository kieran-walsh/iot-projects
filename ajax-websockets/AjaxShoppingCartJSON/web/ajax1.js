
//Checks to see if the browser supports HTTP requests
//If so, create and return one; if not - return false
function newXMLHttpRequest() {

  //Used to store request object or false (signifying no object found)
  var xmlreq = false;

  //Use the standard instantiation method on
  //non-Windows machines
  if (window.XMLHttpRequest) {
    xmlreq = new XMLHttpRequest();

  }
  //If no XMLHttpRequest object is found, try
  //Instantiating an ActiveXObject instead
  else if (window.ActiveXObject) {
    try {
      //Try to instantiate an ActiveXObject found
      //In older versions of IE
      xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
      
    }
    //Catch error if no object is found
    catch (e1) {
      try {
        //Try to instantiate another, older version of
        //ActiveXObject
        xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
      }
      //Catch error if that object is not found
      catch (e2) {
        //Signifies that an HTTP request object couldn't be created
        xmlreq = false;
      }
    }
  }
  //Return the end result
  return xmlreq;
}

//Returns a function that is used to check whether the request is completed
//and then send the response to the "response handler" function
 function getReadyStateHandler(req, responseJSONHandler) {

   //Return an anonymous function that checks to see that the
   //request has been completed
   return function () {

     //A readyState value of 4 indicates that the request is complete
     if (req.readyState == 4) {
       
       //A status value of 200 indicates that we have successfully received
       //a response
       if (req.status == 200) {

         //Send the response's output to the handler function
         responseJSONHandler(req.responseText);
       }
       else {
         //Alert the user if there was an issue with the request
         alert("HTTP error "+req.status+": "+req.statusText);
       }
     }
   }
 }
