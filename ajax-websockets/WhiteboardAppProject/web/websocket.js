// initiate the handshake
// Open a new WebSocket connection (ws), use wss for secure connection
var wsUri = "ws://" + document.location.host + document.location.pathname + "whiteboardendpoint";
var websocket = new WebSocket(wsUri);

//Optional callback, invoked if a connection error has occurred
websocket.onerror = function(evt) { onError(evt) };
function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}
// Optional callback, invoked when the connection is terminated
websocket.onclose = function() { alert('Connection closed'); }

// For testing purposes
//var output = document.getElementById("output");

// Optional callback, invoked when a WebSocket connection is established
websocket.onopen = function(evt) {
    onOpen(evt)
};
function onOpen() {
    writeToScreen("Connected to " + wsUri);
}

function writeToScreen(message) {
    output.innerHTML += message + "<br>";
}

// A callback function invoked for each new message from the server
websocket.onmessage = function(evt) { onMessage(evt) };
function onMessage(evt) {
    console.log("received: " + evt.data);
    updateLocalCart(evt.data);
}

function sendText(json) {
    console.log("sending text: " + json);
    //Client-initiated message to the server
    websocket.send(json);
}
