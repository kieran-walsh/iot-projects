<!-- -->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>ArgonTracker</title>
    <style>
      table {
        text-align: left;
      }
      table * {
        padding: 5px;
        border: 1px solid black;
      }
    </style>
  </head>
  <body onload="getArgonFleet()">
    <h1>ArgonTracker</h1>
    <table>
      <tr><th>Argon ID</th><th>Last Heartbeat</th><th>Update</th></tr>
    </table>
    <br/>
    <script type="text/javascript" src="ajax1.js"></script>
    <script type="text/javascript" src="argon.js"></script>
  </body>
</html>
