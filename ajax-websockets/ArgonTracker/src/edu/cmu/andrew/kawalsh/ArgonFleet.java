package edu.cmu.andrew.kawalsh;
import java.util.*;

//Class that stores information about Argons connected to the server
public class ArgonFleet {

    private HashMap<String, Long> fleet;

    public ArgonFleet() {
        fleet = new HashMap<String, Long>();
    }

    //Update current Argon entry with most recent heartbeat
    //Or add a new record if the Argon's not there
    //@param id - ID of the Argon
    //@param heartbeat - the Argon's most recent heartbeat
    public void updateFleet(String id, Long heartbeat) {
        fleet.put(id, heartbeat);
    }

    //Return a JSON representation of the HashMap
    //To be sent back to the client
    //@param deviceID - ID of the device to get data about
    // (or null to get data about all devices)
    public String getJSON(String deviceID) {
        StringBuilder json = new StringBuilder("{ ");
        //If deviceID is null, return a JSON string of all
        //Argons in the HashMap
        if (deviceID == null) {
            Iterator it = fleet.keySet().iterator();
            while (it.hasNext()) {
                String id = (String) it.next();
                json.append(argonToJSON(id));
            }
        }
        //If a deviceID is given, return a JSON string
        //of only that Argon's data
        else {
            //Check to make sure that Argon is in the system
            if (fleet.containsKey(deviceID)) {
                json.append(argonToJSON(deviceID));
            }
        }
        //Finishing touches on the JSON string to prevent errors
        json.deleteCharAt(json.lastIndexOf(","));
        json.append("}");
        return json.toString();
    }

    //Convert one Argon record in the HashMap to a JSON string
    private String argonToJSON(String deviceID) {
        StringBuilder json = new StringBuilder();
        //Set the device ID as the key of the pair
        json.append("\"" + deviceID + "\": ");
        long lastHeartbeat = fleet.get(deviceID);
        long currentTime = System.currentTimeMillis();
        //Find discrepancy between last heartbeat and current time
        //To check for possible failures
        int heartbeatDiff = (int) (currentTime - lastHeartbeat) / 1000;
        json.append("\"" + heartbeatDiff + "" + " second(s) ago");
        //Add "suspected failure" if discrepancy is at least 20sec
        if (heartbeatDiff >= 20) {
            json.append(". Suspected failure");
        }
        json.append("\", ");
        return json.toString();
    }
}
