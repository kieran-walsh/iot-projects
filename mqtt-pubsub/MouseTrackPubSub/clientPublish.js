//Scripts to create a client and publish

//Create a new MQTT client using the Paho library provided by the other JS file
client = new Paho.MQTT.Client(location.hostname, 9002, "Sub_"+Math.random());

//Set callbacks to fire when the connection is lost or when there's a new message
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect the client to the MQTT server
client.connect({onSuccess:onConnect});

// Callback function that simply connects to the server
// Don't need to subscribe to anything since this is a publisher
function onConnect() {
    console.log("onConnect");
}

// Function to handle a lost connection to the MQTT server
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}

// Update the HTML page when a new message is received
// (Not really needed since this is a publisher)
function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
}

//Uses mouse-move JS event to find mouse coordinates, format them into
//a string, and send them to the "demo" <p> for users to see
function getMouseCoordinates(e) {
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    document.getElementById("demo").innerHTML = coor;
    sendMessage(coor);
}

//Removes coordinates from "demo" <p> element when mouse leaves box
function clearCoor() {
    document.getElementById("demo").innerHTML = "";
    var coor = "Coordinates: (out of box)";
    sendMessage(coor);
}

//Packages the given JSON into an MQTT message and publishes it
//To the MQTT server under the given topic
function sendMessage(msg) {
    var message = new Paho.MQTT.Message(msg);
    message.destinationName = "Coordinates";
    client.send(message);
}