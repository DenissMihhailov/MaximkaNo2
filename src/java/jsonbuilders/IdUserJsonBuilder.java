/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsonbuilders;

import entity.User;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author Deniss
 */
public class IdUserJsonBuilder {
    public JsonObject getJsonId(User user){
    JsonObjectBuilder job = Json.createObjectBuilder();
    job.add("id", user.getId());
    job.add("login", user.getLogin());
    return job.build();
               
    }
}
