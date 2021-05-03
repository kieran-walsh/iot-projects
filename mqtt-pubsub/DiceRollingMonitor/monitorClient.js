//Scripts to create a client and publish

//Create a new MQTT client using the Paho library provided by the other JS file
client = new Paho.MQTT.Client(location.hostname, 9002, "Sub_"+Math.random());

//Set callbacks to fire when the connection is lost or when there's a new message
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// Connect the client to the MQTT server
client.connect({onSuccess:onConnect});

// Callback function that subscribes the the "diceRolls" topic on connection
function onConnect() {
    console.log("onConnect");
    client.subscribe("diceRolls");
}

// Function to handle a lost connection to the MQTT server
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}

// Take the received JSON string message, parse it into
// JSON, and send to drawCharts to be used
function onMessageArrived(message) {
    console.log("onMessageArrived: "+message.payloadString);
    var json = JSON.parse(message.payloadString);
    drawCharts(json);

}