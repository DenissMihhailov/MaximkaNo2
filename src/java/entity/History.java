/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author Deniss
 */
@Entity
public class History implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private Sneaker sneaker;
    @OneToOne
    private User user;
    @Temporal(TemporalType.TIMESTAMP)
    private Date soldSneaker;

    public History() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Sneaker getSneaker() {
        return sneaker;
    }

    public void setSneaker(Sneaker sneaker) {
        this.sneaker = sneaker;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getSoldSneaker() {
        return soldSneaker;
    }

    public void setSoldSneaker(Date soldSneaker) {
        this.soldSneaker = soldSneaker;
    }

    @Override
    public int hashCode() {
        int hash = 3;
        hash = 83 * hash + Objects.hashCode(this.id);
        hash = 83 * hash + Objects.hashCode(this.sneaker);
        hash = 83 * hash + Objects.hashCode(this.user);
        hash = 83 * hash + Objects.hashCode(this.soldSneaker);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final History other = (History) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        if (!Objects.equals(this.sneaker, other.sneaker)) {
            return false;
        }
        if (!Objects.equals(this.user, other.user)) {
            return false;
        }
        if (!Objects.equals(this.soldSneaker, other.soldSneaker)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "History{" + "id=" + id + ", sneaker=" + sneaker + ", user=" + user + ", soldSneaker=" + soldSneaker + '}';
    }

   
    
}