<%--
  Created by IntelliJ IDEA.
  User: kieranwalsh
  Date: 3/1/21
  Time: 8:17 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>Dice Rolling Monitor</title>
</head>
<body>
<p>This client is connected to an MQTT broker and receives mouse-movement messages from a publisher.</p>
<p id="msg-display"></p>
</body>
<!-- MQTT connection script from IBM -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
<!-- JS Code to create client, retrieve mouse location, and send message -->
<script src="clientSubscribe.js"></script>
</html>