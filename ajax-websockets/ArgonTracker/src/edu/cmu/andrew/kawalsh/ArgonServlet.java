package edu.cmu.andrew.kawalsh;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ArgonServlet extends HttpServlet {

    ArgonFleet fleet;

    //Initialize an ArgonFleet (HashMap) to keep track of
    //all Argons connected to the system
    public void init() throws ServletException {
        fleet = new ArgonFleet();
    }

    //Take in request from Argon or client browser and return appropriate
    //data to each device
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
                                        throws ServletException, IOException {
        String action = request.getParameter("action");
        String deviceID = request.getParameter("Argon_ID");
        String json = "";

        //Condition: request to get data about all devices
        //(essentially a full-page refresh)
        if (action == null && deviceID == null) {
            try {
                json = fleet.getJSON(null);
            }
            catch (Exception e) {
                System.out.println("Nothing to output yet");
            }
            response.setContentType("application/json");
            response.getWriter().write(json);
            System.out.println("get");
        }
        //Condition: POST request sent by the Argon
        //Sends its ID and no action
        else if (action == null && deviceID != null) {
            long lastHeartbeat = System.currentTimeMillis();
            fleet.updateFleet(deviceID, lastHeartbeat);
        }
        //Condition: Ajax call to update data about one Argon
        //Send response back to the client
        else if (action.equals("getOne") && deviceID != null) {
            json = fleet.getJSON(deviceID);
            response.setContentType("application/json");
            response.getWriter().write(json);
        }
    }

    //Redirect GET requests as POST requests
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
                                        throws ServletException, IOException {
        doPost(request, response);
    }
}
