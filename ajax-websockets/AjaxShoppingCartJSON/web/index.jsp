<%@ page import="java.util.*" %>
<%@ page import="developerworks.ajax.store.*" %>
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" language="javascript" src="ajax1.js"></script>
    <script type="text/javascript" language="javascript" src="cart.js"></script>
  </head>
  <!-- Hidden cart items bug fix -->
  <!-- When you call addToCart, it updates the cart/display before adding
       a new item - when you give it "null" as an item, it updates the
       display without changing the cart -->
  <body onload="addToCart(null);">
    <!-- Setting up the interface of the web page -->
    <div style="float: left; width: 500px">
      <h2>Catalog</h2>
      <table border="1">
        <thead><th>Name</th><th>Description</th><th>Price</th><th></th><th></th></thead>
        <tbody>
        <!-- Initializing the table of items with Java code -->
        <%
          for (Iterator<Item> I = new Catalog().getAllItems().iterator() ; I.hasNext() ; ) {
            Item item = I.next();
        %>
          <tr><td><%= item.getName() %></td>
            <td><%= item.getDescription() %></td>
            <td><%= item.getFormattedPrice() %></td>
            <td><button onclick="addToCart('<%= item.getCode() %>')">Add to Cart</button></td>
            <td><button onclick="removeFromCart('<%= item.getCode() %>')">Remove from Cart</button></td>
          </tr>
          <% } %>
        </tbody>
      </table>
    </div>

    <div style="position: absolute; top: 0px; right: 0px; width: 250px">
      <h2>Cart Contents</h2>
      <ul id="contents">
      </ul>
      Total cost: <span id="total">$0.00</span>
    </div>
  </body>
</html>
