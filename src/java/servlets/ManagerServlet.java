/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.History;
import entity.Role;
import entity.Sneaker;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
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
import sessions.HistoryFacade;
import sessions.RoleFacade;
import sessions.SneakerFacade;
import sessions.UserFacade;
import sessions.UserRolesFacade;
import tools.PasswordProtected;

/**
 *
 * @author Deniss
 */
@WebServlet(name = "ManagerServlet", urlPatterns = {"/createNewSneaker",
"/getSneakers","/setQuantity","/getUsersMap","/getRoles","/setUserRole","/setLink",
"/getBuyers","/updateUserData","/updatePassword","/purchaseHistory","/getSoldSneakers"})
public class ManagerServlet extends HttpServlet {
@EJB SneakerFacade sneakerFacade;
@EJB UserFacade userFacade;
@EJB BuyerFacade buyerFacade;
@EJB RoleFacade roleFacade;
@EJB UserRolesFacade userRolesFacade;
@EJB HistoryFacade historyFacade;

private PasswordProtected pp = new PasswordProtected();
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
         HttpSession session = null;
         JsonObjectBuilder job = Json.createObjectBuilder();
         String path = request.getServletPath();
        switch (path) {
            case "/createNewSneaker":
                JsonReader jsonReader = Json.createReader(request.getReader());
                JsonObject jsonObject = jsonReader.readObject();
                String firm = jsonObject.getString("firm","");
                String model = jsonObject.getString("model","");
                String size = jsonObject.getString("size","");
                String price = jsonObject.getString("price","");
                String description = jsonObject.getString("description","");
                if("".equals(firm) || "".equals(model)
                        || "".equals(size) || "".equals(price) || "".equals(description) ){
                    job.add("info", "Заполните все поля!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                Sneaker sneaker = new Sneaker();
                sneaker.setSneakerFirm(firm);
                sneaker.setSneakerModel(model);
                sneaker.setSneakerSize(Integer.parseInt(size));
                sneaker.setSneakerPrice(Double.parseDouble(price));
                sneaker.setDescription(description);
                sneaker.setImgLink("https://i.ibb.co/VqQTZBd/null.jpg");
                sneakerFacade.create(sneaker);
                job.add("info", "Кроссовки добавлены!");
                    job.add("status", true);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
            case "/getSneakers":
                List<Sneaker> listSneakers = sneakerFacade.findAll();
                JsonArrayBuilder jab = Json.createArrayBuilder();
                for(int i = 0; i < listSneakers.size(); i++){
                    JsonObjectBuilder jsonRoleBuilder = Json.createObjectBuilder();
                    jsonRoleBuilder.add("id", listSneakers.get(i).getId());
                    jsonRoleBuilder.add("sneakerFirm", listSneakers.get(i).getSneakerFirm());
                    jsonRoleBuilder.add("sneakerModel", listSneakers.get(i).getSneakerModel());
                    jsonRoleBuilder.add("sneakerSize", listSneakers.get(i).getSneakerSize());
                    jsonRoleBuilder.add("sneakerPrice", listSneakers.get(i).getSneakerPrice());
                    jsonRoleBuilder.add("sneakerQuantity", listSneakers.get(i).getSneakerQuantity());
                    jsonRoleBuilder.add("sneakerDescription", listSneakers.get(i).getDescription());
                    jsonRoleBuilder.add("imgLink", listSneakers.get(i).getImgLink());
                    jab.add(jsonRoleBuilder);
                }
                job.add("status",true);
                job.add("sneaker", jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
                case "/getBuyers":
                List<User> listUsers = userFacade.findAll();
                jab = Json.createArrayBuilder();
                for(int i = 0; i < listUsers.size(); i++){
                    JsonObjectBuilder jsonRoleBuilder = Json.createObjectBuilder();
                    jsonRoleBuilder.add("id", listUsers.get(i).getBuyer().getId());
                    jsonRoleBuilder.add("firstName", listUsers.get(i).getBuyer().getBuyerFirstName());
                    jsonRoleBuilder.add("lastName", listUsers.get(i).getBuyer().getBuyerLastName());
                    jsonRoleBuilder.add("phone", listUsers.get(i).getBuyer().getBuyerPhone());
                    jsonRoleBuilder.add("money", listUsers.get(i).getBuyer().getBuyerMoney());
                    jsonRoleBuilder.add("login", listUsers.get(i).getLogin());
                    jab.add(jsonRoleBuilder);
                }
                job.add("status",true);
                job.add("buyer", jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/setQuantity":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String quantity = jsonObject.getString("quantity","");
                String sneakerId = jsonObject.getString("sneakerId","");
                if("".equals(quantity)){
                    job.add("info", "Напишите количество для поступления!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                if("0".equals(sneakerId)){
                    job.add("info", "Выберите кроссовки!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;               
                }
                sneaker = sneakerFacade.find(Long.parseLong(sneakerId));
                sneaker.setSneakerQuantity(Integer.parseInt(quantity));
                sneakerFacade.edit(sneaker);
                job.add("info", "Поступления получены!");
                    job.add("status", true);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
            case "/setLink":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String link = jsonObject.getString("link","");
                sneakerId = jsonObject.getString("sneakerId","");
                if("".equals(link)){
                    job.add("info", "Вставте ссылку!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                if("0".equals(sneakerId)){
                    job.add("info", "Выберите кроссовки!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;               
                }
                sneaker = sneakerFacade.find(Long.parseLong(sneakerId));
                sneaker.setImgLink(link);
                sneakerFacade.edit(sneaker);
                job.add("info", "Картинка добавлена!");
                    job.add("status", true);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
                case "/getRoles":
                List<Role> listRoles = roleFacade.findAll();
                jab = Json.createArrayBuilder();
                for(int i = 0; i < listRoles.size(); i++){
                    JsonObjectBuilder jsonRoleBuilder = Json.createObjectBuilder();
                    jsonRoleBuilder.add("id", listRoles.get(i).getId());
                    jsonRoleBuilder.add("roleName", listRoles.get(i).getRoleName());
                    jab.add(jsonRoleBuilder);
                }
                job.add("status",true);
                job.add("roles", jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/getUsersMap":
                listUsers = userFacade.findAll();
                jab = Json.createArrayBuilder();
                
                UserJsonBuilder ujb = new UserJsonBuilder();
                for (int i = 0; i < listUsers.size(); i++) {
                    JsonObjectBuilder jsonUserRoleBuilder = Json.createObjectBuilder();
                    jsonUserRoleBuilder.add("user", ujb.getJsonUser(listUsers.get(i)));
                    jsonUserRoleBuilder.add("role", userRolesFacade.getRoleNameUser(listUsers.get(i)));
                    jab.add(jsonUserRoleBuilder.build());
                }
                job.add("status", true);
                job.add("usersMap",jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "/setUserRole":
                    jsonReader = Json.createReader(request.getReader());
                    JsonObject jo = jsonReader.readObject();
                    String userId = jo.getString("userId","");
                    String roleId = jo.getString("roleId","");
                    if ("0".equals(userId) || "0".equals(roleId)) {
                        job.add("info", "Все поля должны быть выбраны!");
                        job.add("status", false);
                        try (PrintWriter out = response.getWriter()) {
                            out.println(job.build().toString());
                        }
                        break;                  
                    }   
                    if(userFacade.find(Long.parseLong(userId)).getLogin().equals("admin")){
                        job.add("info", "Этому пользователю нельзя изменить роль!");
                        job.add("status", false);
                        try (PrintWriter out = response.getWriter()) {
                            out.println(job.build().toString());
                        }
                        break; 
                    }
                    User user = userFacade.find(Long.parseLong(userId));
                    Role role = roleFacade.find(Long.parseLong(roleId));
                    userRolesFacade.setUserRole(user,role);
                    job.add("user", new UserJsonBuilder().getJsonUser(user));
                    job.add("role", new RoleJsonBuilder().getJsonRole(role));
                    job.add("info", "Роль изменена!");
                    job.add("status", true);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
            case "/updateUserData":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String newName = jsonObject.getString("newName","");
                String newLastName = jsonObject.getString("newLastName","");
                String newPhone = jsonObject.getString("newPhone","");
                String newMoney = jsonObject.getString("newMoney","");
                String id = jsonObject.getString("authId","");
                if("".equals(newName) || "".equals(newLastName)
                        || "".equals(newPhone) || "".equals(newMoney)){
                    job.add("info", "&nbsp;");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                User updateUser = userFacade.find(Long.parseLong(id));
                updateUser.getBuyer().setBuyerFirstName(newName);
                updateUser.getBuyer().setBuyerLastName(newLastName);
                updateUser.getBuyer().setBuyerPhone(newPhone);
                updateUser.getBuyer().setBuyerMoney(Double.parseDouble(newMoney));
                userFacade.edit(updateUser);
                buyerFacade.edit(updateUser.getBuyer());
                job.add("info", "&nbsp;");
                    job.add("status", true);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
            case "/updatePassword":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String oldPassword = jsonObject.getString("oldPassword","");
                String newPassword1  = jsonObject.getString("newPassword1","");
                String newPassword2 = jsonObject.getString("newPassword2","");
                id = jsonObject.getString("authId","");
                if("".equals(oldPassword) || "".equals(newPassword1)
                        || "".equals(newPassword2)){
                    job.add("info", "Заполните все поля!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                if(!newPassword1.equals(newPassword2)){
                    job.add("info", "Новые пароли не совпадают!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                User authUser = userFacade.find(Long.parseLong(id));
                String salt = authUser.getSalt();
                String checkPass = pp.passwordEncript(oldPassword, salt);
                if(!checkPass.equals(authUser.getPassword())){
                    job.add("info", "Старый пароль не верен!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                String updatePass = pp.passwordEncript(newPassword1, salt);
                authUser.setPassword(updatePass);
                userFacade.edit(authUser);
                job.add("info", "Данные изменены!");
                    job.add("status", true);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
            case "/purchaseHistory":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                String sneakId = jsonObject.getString("sneakId","");
                String buyerId  = jsonObject.getString("buyerId","");
                sneaker = sneakerFacade.find(Long.parseLong(sneakId));
                User buyer = userFacade.find(Long.parseLong(buyerId));
                if(buyer.getBuyer().getBuyerMoney()<sneaker.getSneakerPrice()){
                    job.add("info", "У вас не хватает денег. Пополните баланс!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                if(sneaker.getSneakerQuantity()==0){
                    job.add("info", "Сожалеем, кроссовок нет в наличии!");
                    job.add("status", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    break;
                }
                History history = new History();
                history.setUser(buyer);
                history.setSneaker(sneaker);
                history.setSoldSneaker(Calendar.getInstance().getTime());
                buyer.getBuyer().setBuyerMoney(buyer.getBuyer().getBuyerMoney()-sneaker.getSneakerPrice());
                sneaker.setSneakerQuantity(sneaker.getSneakerQuantity()-1);
                historyFacade.create(history);
                sneakerFacade.edit(sneaker);
                buyerFacade.edit(buyer.getBuyer());
                job.add("info", "Вы успешно купили обувь!");
                    job.add("status", true);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                break;
            case "/getSoldSneakers":
                jsonReader = Json.createReader(request.getReader());
                jsonObject = jsonReader.readObject();
                jab = Json.createArrayBuilder();
                id = jsonObject.getString("buyerId",""); 
                authUser = userFacade.find(Long.parseLong(id));
                List<History> listHistory = historyFacade.findAll();
                List<History> listUserHistory = new ArrayList<>();
                Format formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                for (int i = 0; i < listHistory.size(); i++) {
                    if (listHistory.get(i).getUser().getLogin().equals(authUser.getLogin())) {
                        listUserHistory.add(listHistory.get(i));
                    }
                }
                for(int i = 0; i < listUserHistory.size(); i++){
                    JsonObjectBuilder jsonRoleBuilder = Json.createObjectBuilder();
                    jsonRoleBuilder.add("id", listUserHistory.get(i).getId());
                    jsonRoleBuilder.add("sneakerFirm", listUserHistory.get(i).getSneaker().getSneakerFirm());
                    jsonRoleBuilder.add("sneakerModel", listUserHistory.get(i).getSneaker().getSneakerModel());
                    jsonRoleBuilder.add("sneakerPrice", listUserHistory.get(i).getSneaker().getSneakerPrice());
                    jsonRoleBuilder.add("sneakerDate", formatter.format(listUserHistory.get(i).getSoldSneaker()));
                    jab.add(jsonRoleBuilder);
                }
                job.add("status",true);
                job.add("sneaker", jab.build());
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
            case "":
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
