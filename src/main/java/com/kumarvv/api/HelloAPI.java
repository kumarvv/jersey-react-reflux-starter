package com.kumarvv.api;

import com.kumarvv.model.UserVO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;

@Path("/hello")
@Produces(MediaType.APPLICATION_JSON)
public class HelloAPI {

    @GET
    public String hello() {
        return "Hello!";
    }

    @GET
    @Path("{name}")
    public Map<String, UserVO> hello(@PathParam("name") String name) {
        Map<String, UserVO> map = new HashMap<>();
        map.put("hello", new UserVO(name));
        return map;
    }
}