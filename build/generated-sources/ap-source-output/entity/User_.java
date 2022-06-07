package entity;

import entity.Buyer;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-06-06T15:10:57")
@StaticMetamodel(User.class)
public class User_ { 

    public static volatile SingularAttribute<User, String> password;
    public static volatile SingularAttribute<User, String> salt;
    public static volatile SingularAttribute<User, Long> id;
    public static volatile SingularAttribute<User, String> login;
    public static volatile SingularAttribute<User, Buyer> buyer;

}