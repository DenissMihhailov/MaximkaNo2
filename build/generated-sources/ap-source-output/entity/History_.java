package entity;

import entity.Sneaker;
import entity.User;
import java.util.Date;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2022-06-06T15:10:57")
@StaticMetamodel(History.class)
public class History_ { 

    public static volatile SingularAttribute<History, Date> soldSneaker;
    public static volatile SingularAttribute<History, Long> id;
    public static volatile SingularAttribute<History, User> user;
    public static volatile SingularAttribute<History, Sneaker> sneaker;

}