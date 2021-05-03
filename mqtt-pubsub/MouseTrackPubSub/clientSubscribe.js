//Scripts to create a client and publish

//Create a new MQTT client using the Paho library provided by the other JS file
client = new Paho.MQTT.Client(location.hostname, 9002, "Sub_"+Math.random());

//Set callbacks to fire when the connection is lost or when there's a new message
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect the client to the MQTT server
client.connect({onSuccess:onConnect});

// Callback function that subscribes the the "Coordinates" topic on connection
function onConnect() {
    console.log("onConnect");
    client.subscribe("Coordinates");
}

// Function to handle a lost connection to the MQTT server
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}

// Update the HTML page when a new message is received
function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
    document.querySelector('#msg-display').innerHTML = message.payloadString;

}