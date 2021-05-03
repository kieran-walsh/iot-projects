package edu.cmu.andrew.kawalsh;

// FigureEncoder.java

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;


public class FigureEncoder implements Encoder.Text<Figure> {

    //Convert Figure Object to JSON string
    @Override
    public String encode(Figure figure) throws EncodeException {
        return figure.getJson().toString();
    }

    @Override
    public void init(EndpointConfig config) {
        System.out.println("init");
    }

    @Override
    public void destroy() {
        System.out.println("destroy");
    }

}