//JS code for ArgonTracker (client-side code)
var table = document.querySelector("table");

//Send a POST request to get data about all Argons connected
//To the server - usually a full-page refresh
function getArgonFleet() {
    console.log("getting all");
    var req = newXMLHttpRequest();
    req.onreadystatechange = getReadyStateHandler(req, displayFleet);
    req.open("POST", "./ArgonServlet", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send();
}

//Send a POST request to get data about one Argon device
//Done using Ajax - sends action "getOne" and device ID
//@param deviceID - ID of device to get update for
function getOneUpdate(deviceID) {
    console.log("getting one");
    var req = newXMLHttpRequest();
    req.onreadystatechange = getReadyStateHandler(req, updateHeartbeat);
    req.open("POST", "./ArgonServlet", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("action=getOne&Argon_ID="+deviceID);
}

//Take JSON response from server and
//Create table out of device records
//Typically used with getArgonFleet()
//@param json - JSON response from the server
function displayFleet(json) {
    json = JSON.parse(json);
    //Go through the records of each Argon
    //And add a row to the table in index.jsp
    //With data about each device
    for (var argon in json) {
        var row = document.createElement("tr");
        var id = argon;
        var heartbeat = json[argon];
        row.innerHTML = "<td>"+id+"</td><td>"+heartbeat+"</td><td><button onclick='getOneUpdate(\""+id+"\")'>Get Update</button></td>";
        table.appendChild(row);
    }
}

//Take JSON response from server and find/update row with
//Data corresponding to the data received
//Typically used with getOneUpdate()
//@param json - JSON response from the server
function updateHeartbeat(json) {
    json = JSON.parse(json);
    //(There will only be one Argon in this list)
    for (var argon in json) {
        var id = argon;
        var heartbeat = json[argon]
        var rows = document.querySelectorAll('tr');
        //Search through the rows in the table and find the one
        //that matches the device ID, and then update that row
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            if (row.innerHTML.includes(id)) {
                row.innerHTML = "<td>"+id+"</td><td>"+heartbeat+"</td><td><button onclick='getOneUpdate(\""+id+"\")'>Get Update</button></td>";
            }
        }
    }
}