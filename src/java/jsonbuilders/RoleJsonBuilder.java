

package jsonbuilders;

import entity.Role;
import entity.User;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;


public class RoleJsonBuilder {
    public JsonObject getJsonRole(Role role){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", role.getId());
        job.add("roleName", role.getRoleName());
        return job.build();
               
    }
}
