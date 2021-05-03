//Scripts to create a client and publish

//Create a new MQTT client using the Paho library provided by the other JS file
client = new Paho.MQTT.Client(location.hostname, 9002, "Sub_"+Math.random());

//Set callbacks to fire when the connection is lost or when there's a new message
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

//Connect the client to the MQTT server
client.connect({onSuccess:onConnect});

//Callback function that subscribes the the "student/id" topic on connection
function onConnect() {
    console.log("onConnect");
    client.subscribe("student/id");
}

//Function to handle a lost connection to the MQTT server
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}

//When a new message is received, parse the JSON into a string
//And use that to update the table element
function onMessageArrived(message) {
    console.log("onMessageArrived: "+message.payloadString);
    var nameUrlString = jsonToSetString(message);
    //Add it to the set to make sure there are no duplicates
    //And then use the set to update the contents
    var set = new Set();
    set.add(nameUrlString);
    updateTable(set);
}

//Take in the JSON, parse to a string and then
//Return a string of name,url (for easier comparisons in the set)
function jsonToSetString(message) {
    var json = JSON.parse(message.payloadString);
    var name = json.name;
    var url = json.URL;
    return name + "," + url;
}

//Every time there is a new message, update the
//table in index.html
function updateTable(set) {
    var table = document.querySelector('table');
    //Add the headers to the table element
    table.innerHTML = "<tr><th>Name</th><th>URL</th></tr>";

    //Iterate over all the keys in the set and create
    //A row in the table
    set.forEach(function(value) {
        //Split the name,url string and create columns
        //To a <tr> element to be added
        var split = value.split(',');
        var tdName = "<td>" + split[0] + "</td>";
        var tdURL = "<td>" + split[1] + "</td>";
        var row = document.createElement('tr');
        table.innerHTML += tdName + tdURL;
        document.querySelector('#argon-table').appendChild(row);
    });

}