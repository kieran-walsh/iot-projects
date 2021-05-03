package developerworks.ajax.store;

import java.math.BigDecimal;
import java.util.*;

/**
 * A very simple shopping Cart
 */
public class Cart {

  private HashMap<Item,Integer> contents;

  /**
   * Creates a new Cart instance
   */
  public Cart() {
    contents = new HashMap<Item,Integer>();
  }

  /**
   * Adds a named item to the cart
   * @param itemCode The name of the item to add to the cart
   */
  public void addItem(String itemCode) {

    Catalog catalog = new Catalog();

    //Checks to see if the requested item is
    //in the catalog- if so, retrieve its
    //information and add it to the cart
    if (catalog.containsItem(itemCode)) {
      Item item = catalog.getItem(itemCode);

      int newQuantity = 1;
      if (contents.containsKey(item)) {
        Integer currentQuantity = contents.get(item);
        newQuantity += currentQuantity.intValue();
      }

      contents.put(item, new Integer(newQuantity));
    }
  }

  /**
   * Removes the named item from the cart
   * @param itemCode Name of item to remove
   */
  public void removeItems(String itemCode) {
    //Don't need to check if it's in the catalog
    //Because it's already added to the cart
    Item item = new Catalog().getItem(itemCode);

    //Check to see if the item is in "contents"
    //If not - ignore the request
    if (contents.containsKey(item)) {
      Integer currentQuantity = contents.get(item);
      int newQuantity = currentQuantity - 1;

      //Remove if there are none left in the cart,
      //or update listing with new value
      if (newQuantity == 0) {
        contents.remove(item);
      }
      else {
        contents.put(item, newQuantity);
      }
    }
  }

  /**
   * @return JSON representation of cart contents
   */
  public String toJSON() {
    //Create a new StringBuffer to add all the information to
    //And add metadata
    StringBuffer json = new StringBuffer();
    json.append("{ \"generated\": " + System.currentTimeMillis() + ", ");
    json.append("\"total\": \"" + getCartTotal() + "\" ");

    //If contents has more than 0 elements, add an
    //"items" section to the response
    if (contents.keySet().size() > 0) {
      json.append(", \"items\": {");
      //Go through the items in the list and add all the details
      //About each item in the cart
      Iterator<Item> it = contents.keySet().iterator();
      while (it.hasNext()) {
        Item item = it.next();
        int itemQuantity = contents.get(item).intValue();
        String itemCode = item.getCode();
        String itemName = item.getName();

        json.append("\"" + itemCode + "\": { ");
        json.append("\"name\": \"" + itemName + "\", ");
        json.append("\"quantity\": \"" + itemQuantity + "\"}, ");
      }
      //Remove the last comma
      json.deleteCharAt(json.lastIndexOf(","));
      json.append("}");
    }
    json.append("}");
    return json.toString();
  }

  //Gets the total price of everything in the cart
  private String getCartTotal() {
    int total = 0;

    //Go through the cart and look at the price and
    //Quantity of each item, and then add that
    //price to the total
    for (Iterator<Item> I = contents.keySet().iterator() ; I.hasNext() ; ) {
      Item item = I.next();
      int itemQuantity = contents.get(item).intValue();

      total += (item.getPrice() * itemQuantity);
    }

    return "$"+new BigDecimal(total).movePointLeft(2);
  }
}
