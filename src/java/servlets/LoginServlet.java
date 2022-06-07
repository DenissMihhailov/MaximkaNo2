/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import entity.Buyer;
import entity.Role;
import entity.User;
import entity.UserRoles;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import jsonbuilders.RoleJsonBuilder;
import jsonbuilders.UserJsonBuilder;
import sessions.BuyerFacade;
import sessions.RoleFacade;
import sessions.UserFacade;
import sessions.UserRolesFacade;
import tools.PasswordProtected;

/**
 *
 * @author Deniss
 */
@WebServlet(urlPatterns = {"/registration", "/login","/logout"})
public class LoginServlet extends HttpServlet {
@EJB UserFacade userFacade;
@EJB BuyerFacade buyerFacade;
@EJB RoleFacade roleFacade;
@EJB UserRolesFacade userRolesFacade;

private PasswordProtected pp = new PasswordProtected();

@Override
    public void init() throws ServletException {
        super.init();
        if(userFacade.count() != 0) return;
        Buyer buyer = new Buyer();
        buyer.setBuyerFirstName("Juri");
        buyer.setBuyerLastName("Melnikov");
        buyer.setBuyerPhone("+37258235140");
        buyerFacade.create(buyer);
        User user = new User();
        user.setLogin("admin");
        user.setBuyer(buyer);
        String salt = pp.getSalt();
        user.setSalt(salt);
        String password = pp.passwordEncript("12345", salt);
        user.setPassword(password);
        userFacade.create(user);
        Role role = new Role();
        role.setRoleName("USER");
        roleFacade.create(role);
        UserRoles userRoles = new UserRoles();
        userRoles.setRole(role);
        userRoles.setUser(user);
        userRolesFacade.create(userRoles);
        
        role = new Role();
        role.setRoleName("ADMINISTRATOR");
        roleFacade.create(role);
        userRoles = new UserRoles();
        userRoles.setRole(role);
        userRoles.setUser(user);
        userRolesFacade.create(userRoles);
    }
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        String path = request.getServletPath();
        switch (path) {
            case "/login":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jo = jsonReader.readObject();
                String login = jo.getString("login","");
                String password = jo.getString("password","");
                User authUser = userFacade.findByLogin(login);
                if(authUser == null){
                    job.add("info", "Нет такого пользователя");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                password = pp.passwordEncript(password, authUser.getSalt());
                if(!password.equals(authUser.getPassword())){
                    job.add("info", "Не совпадает пароль");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                HttpSession session = request.getSession(true);
                session.setAttribute("authUser", authUser);
                UserJsonBuilder ujb = new UserJsonBuilder();
                job.add("info", "");
                job.add("auth",true);
                job.add("token", session.getId());
                job.add("user", ujb.getJsonUser(authUser));
                job.add("userId", authUser.getId());
                job.add("role", new RoleJsonBuilder().getJsonRole(userRolesFacade.getRoleUser(authUser)));
                //job.add("idUser", new RoleJsonBuilder().getJsonRole(authUser.getId()));
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
                case "/logout":
                session = request.getSession(false);
                if(session != null){
                    session.invalidate();
                    job.add("info", "");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                }
                break;
            case "/registration":
                jsonReader = Json.createReader(request.getReader());
                jo = jsonReader.readObject();
                String firstname = jo.getString("firstname","");
                String lastname = jo.getString("lastname","");
                String phone = jo.getString("phone","");
                login = jo.getString("login","");
                password = jo.getString("password","");
                if("".equals(firstname) || "".equals(lastname)
                        || "".equals(phone) || "".equals(login)
                        || "".equals(password)){
                    job.add("status", false);
                    job.add("info", "Все поля должны быть заполнены");
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                List<User> users = userFacade.findAll();
                for (int i = 0; i < users.size(); i++) {
                    if (users.get(i).getLogin().equals(login)) {
                        job.add("status", false);
                        job.add("info", "Пользователь с таким логином уже есть");
                        try (PrintWriter out = response.getWriter()) {
                            out.println(job.build().toString());
                        }
                    return;
                    }
                }
                Buyer buyer = new Buyer();
                buyer.setBuyerFirstName(firstname);
                buyer.setBuyerLastName(lastname);
                buyer.setBuyerPhone(phone);
                buyerFacade.create(buyer);
                User user = new User();
                user.setLogin(login);
                String salt = pp.getSalt();
                user.setSalt(salt);
                password = pp.passwordEncript(password, salt);
                user.setPassword(password);
                user.setBuyer(buyer);
                userFacade.create(user);
                Role userRole = roleFacade.findByRoleName("USER");
                UserRoles ur = new UserRoles();
                ur.setRole(userRole);
                ur.setUser(user);
                userRolesFacade.create(ur);
                job.add("status", true);
                    job.add("info", "Новый пользователь добавлен");
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
        }
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
