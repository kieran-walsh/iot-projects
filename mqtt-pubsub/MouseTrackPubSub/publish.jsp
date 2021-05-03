<%--
  Created by IntelliJ IDEA.
  User: kieranwalsh
  Date: 2/27/21
  Time: 2:02 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <!-- CSS Rules for the page -->
    <style>
      div {
        width: 200px;
        height: 100px;
        border: 1px solid black;
      }
    </style>
    <title>Coordinates Publisher</title>
  </head>
  <body>
    <h1>Coordinates Publisher</h1>
    <!-- Box that listens for mouse movement within it and triggers JS event-->
    <div onmousemove="getMouseCoordinates(event)" onmouseout="clearCoor()"></div>

    <!-- HTML code giving directions -->
    <p>Mouse over the rectangle above, and get the coordinates of your mouse pointer.</p>
    <p>When the mouse is moved over the div, the p element will display the horizontal and vertical coordinates of your mouse pointer, whose values are returned from the clientX and clientY properties on the
      MouseEvent object.</p>

    <!-- <p> element where the mouse's coordinates will by populated by JS -->
    <p id="demo"></p>

    <!-- MQTT connection script from IBM -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
    <!-- JS Code to create client, retrieve mouse location, and send message -->
    <script src="clientPublish.js"></script>
  </body>
</html>