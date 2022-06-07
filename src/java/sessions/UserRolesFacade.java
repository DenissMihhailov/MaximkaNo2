/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sessions;

import entity.Role;
import entity.User;
import entity.UserRoles;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author Deniss
 */
@Stateless
public class UserRolesFacade extends AbstractFacade<UserRoles> {
    @EJB RoleFacade roleFacade;

    @PersistenceContext(unitName = "JSBootsShopPU")
    private EntityManager em;

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }

    public UserRolesFacade() {
        super(UserRoles.class);
    }
    
    public void setUserRole(User user, Role role) {
        removeRolesToUser(user);
        UserRoles ur = new UserRoles();
        ur.setRole(role);
        ur.setUser(user);
        super.create(ur);
    }
    
    private void removeRolesToUser(User user) {
        em.createQuery("DELETE FROM UserRoles ur WHERE ur.user = :user")
                .setParameter("user", user)
                .executeUpdate();
    }
    
    public String getRoleNameUser(User user) {
        try {
            List<String> listRoleName = em.createQuery("SELECT ur.role.roleName FROM UserRoles ur WHERE ur.user = :user")
                    .setParameter("user", user)
                    .getResultList();
            if(listRoleName.contains("ADMINISTRATOR")){
                return "ADMINISTRATOR";
            }else if(listRoleName.contains("USER")){
                return "USER";
            }else{
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
    public Role getRoleUser(User user){
        try {
            List<Role> listRoles = em.createQuery("SELECT ur.role FROM UserRoles ur WHERE ur.user = :user")
                    .setParameter("user", user)
                    .getResultList();
            Role roleAdmin = roleFacade.findByRoleName("ADMINISTRATOR");
            Role roleUser = roleFacade.findByRoleName("USER");
            
            if(listRoles.contains(roleAdmin)){
                return roleAdmin;
            }else if(listRoles.contains(roleUser)){
                return roleUser;
            }else{
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
}
