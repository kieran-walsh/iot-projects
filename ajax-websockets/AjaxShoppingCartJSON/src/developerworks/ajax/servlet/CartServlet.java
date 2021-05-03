
package developerworks.ajax.servlet;

import developerworks.ajax.store.Cart;
import javax.servlet.http.*;

import java.util.Enumeration;

public class CartServlet extends HttpServlet {

  /**
   * Updates Cart, and outputs XML representation of contents
   */
  public void doPost(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {

    //Get all the headers from the request and print them out
    //to the console
    Enumeration headers = req.getHeaderNames();
    while (headers.hasMoreElements()) {
      String header = (String) headers.nextElement();
      System.out.println(header+": "+req.getHeader(header));
    }

    //Call the function below to access the cart data
    //Saved from the previous session
    Cart cart = getCartFromSession(req);

    //Get the parameters specified in the request by the
    //sender
    String action = req.getParameter("action");
    String item = req.getParameter("item");

    //Check to make sure both variables have values
    if ((action != null)&&(item != null)) {

      //If the action is "add", call the helper
      //function to add the item to the cart
      if ("add".equals(action)) {
        cart.addItem(item);
      }
      //If the action is "remove" call the helper
      //function to remove the item from the cart
      else if ("remove".equals(action)) {
        cart.removeItems(item);
      }
    }

    //Get the current state of the cart after the above
    //operations
    String cartJSON = cart.toJSON();

    //Set the content type of the server's response and
    //then send the cart status back to the client
    res.setContentType("application/json");
    res.getWriter().write(cartJSON);
  }

  //Reformat any GET requests as POST requests
  public void doGet(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
    // Bounce to post, for debugging use
    // Hit this servlet directly from the browser to see XML
    doPost(req,res);
  }

  private Cart getCartFromSession(HttpServletRequest req) {
    //Get the previous state of the cart from the session
    //And update the cart with that information
    HttpSession session = req.getSession(true);
    Cart cart = (Cart) session.getAttribute("cart");

    //If no cart data is found in the session, make a new one
    if (cart == null) {
      cart = new Cart();
      session.setAttribute("cart", cart);
    }

    return cart;
  }
}
