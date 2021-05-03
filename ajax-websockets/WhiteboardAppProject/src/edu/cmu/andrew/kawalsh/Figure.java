package edu.cmu.andrew.kawalsh;

// Figure.java
import java.io.StringWriter;
import javax.json.Json;
import javax.json.JsonObject;

public class Figure {
    private JsonObject json;

    public Figure() {
    }

    //Write JSON to string
    @Override
    public String toString() {
        StringWriter writer = new StringWriter();
        Json.createWriter(writer).write(json);
        return writer.toString();
    }

    //Instantiates Figure object - essentially a JSON string
    public Figure(JsonObject json) {
        this.json = json;
    }

    public JsonObject getJson() {
        return json;
    }

    public void setJson(JsonObject json) {
        this.json = json;
    }
}
