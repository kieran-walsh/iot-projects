// Timestamp of cart that page was last updated with
var lastCartUpdate = 0;

/*
 * Adds the specified item to the shopping cart, via Ajax call
 * itemCode - product code of the item to add
 */
function addToCart(itemCode) {
    //Creates a new HTTP request using the custom-created method
    //Returns false if no object is created
    var req = newXMLHttpRequest();

    //When the request's state is "ready", call the getReadyStateHandler
    //method to check the request and send the response to the callback
    req.onreadystatechange = getReadyStateHandler(req, updateCart);

    //Create the request via POST to the servlet and do it asynchronously
    req.open("POST", "cart.do", true);
    //Specify what the type of the request is (in this case, form-encoded data)
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //Send the actual request with the necessary data
    req.send("action=add&item="+itemCode);
}

// Adds a specified item to the cart via AJAX
// itemCode - product code of the item
function removeFromCart(itemCode) {
    //Create a new request object
    var req = newXMLHttpRequest();

    //Check the request's ready state for completion
    req.onreadystatechange = getReadyStateHandler(req, updateCart);

    //Send a new POST request asynchronously with the following header
    req.open("POST", "cart.do", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("action=remove&item="+itemCode);
}


/*
 * Update shopping-cart area of page to reflect contents of cart
 * described in XML document.
 */
function updateCart(cartJSON) {
    //Get the cart data from the given JSON response
    var cart = JSON.parse(cartJSON);

    //Get the time that the JSON data was generated and use that
    //To check whether it is old or new
    var generated = cart["generated"];
    if (generated > lastCartUpdate) {
       lastCartUpdate = generated;
       var contents = document.getElementById("contents");
       contents.innerHTML = "";

        //Go through the list of items in the response
        var items = cart["items"];
        for (var item in items) {
            //Get the data from the current item
            var name = items[item]["name"];
            var quantity = items[item]["quantity"];

            //Build the new cart list with the new data
            var listItem = document.createElement("li");
            listItem.appendChild(document.createTextNode(name + " x " + quantity));
            contents.appendChild(listItem);
        }

       //Get the total cost of the items
       var total = cart["total"];
    }

    //Display the new cart data in the browser
    document.getElementById("total").innerHTML = total;
}
