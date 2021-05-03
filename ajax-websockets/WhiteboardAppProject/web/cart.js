//Cart code w/ web sockets

// find contents in HTML document
var contents = document.getElementById("contents");

//Stores the most recent cart in a global variable for easy access
//Gets updated every time a new message is received
var currentCart = {
    "total": "$0.00",
    "items": {}
};

//Respond to local add/remove and then bundle the message
//And then send the message to the server
//@itemCode - product code of the item
//@param name - name of the item
//@param price - formatted price of the item
//@param type - "add" or "remove"
function changeCart(itemCode, name, price, type) {
    var nextCart = currentCart;
    var totalFloat = parseFloat(nextCart.total.substr(1));
    var priceFloat = parseFloat(price.substr(1));

    //If adding to the cart - update quantity or add to the cart
    //then update the total cost
    if (type == "add") {
        if (itemCode in currentCart.items) {
            nextCart.items[itemCode].quantity += 1;
        }
        else {
            nextCart.items[itemCode] = {
                "name": name,
                "quantity": 1
            };
        }

        var nextPrice = totalFloat += priceFloat;
        nextCart.total = "$" + nextPrice.toFixed(2);
    }

    //If removing, decrease the quantity by one and check if
    //the quantity is > 0; if not, remove it
    else if (type == "remove") {
        if (itemCode in currentCart.items) {
            nextCart.items[itemCode].quantity -= 1;
            var nextPrice = totalFloat -= priceFloat;
            nextCart.total = "$" + nextPrice.toFixed(2);

            if (nextCart.items[itemCode].quantity == 0) {
                delete nextCart.items[itemCode];
            }
        }
    }

    //Package JSON string and send it to the server
    var nextCartText = JSON.stringify(nextCart);
    sendText(nextCartText);

    //Use packaged JSON to update local cart after
    //figuring out changes
    updateLocalCart(nextCartText);
}

// Get the most recent message from the server
// And update local cart to align with message
// cartJSON - JSON string of updated cart
function updateLocalCart(cartJSON) {
    //Get the cart data from the given JSON response
    var cart = JSON.parse(cartJSON);
    currentCart = cart;

    //Get the time that the JSON data was generated and use that
    //To check whether it is old or new
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

    //Get the total cost of the items and display
    var total = cart["total"];
    document.getElementById("total").innerHTML = total;
}
