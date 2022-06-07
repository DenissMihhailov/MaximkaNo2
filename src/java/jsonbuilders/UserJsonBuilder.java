

package jsonbuilders;

import entity.User;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;


public class UserJsonBuilder {
    public JsonObject getJsonUser(User user){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", user.getId());
        job.add("login", user.getLogin());
        return job.build();         
    }
}


