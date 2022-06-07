/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author Deniss
 */
@Entity
public class Buyer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String buyerFirstName;
    private String buyerLastName;
    private String buyerPhone;
    private double buyerMoney;

    public Buyer() {
    }

    public Buyer(String buyerFirstName, String buyerLastName, String buyerPhone) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBuyerFirstName() {
        return buyerFirstName;
    }

    public void setBuyerFirstName(String buyerFirstName) {
        this.buyerFirstName = buyerFirstName;
    }

    public String getBuyerLastName() {
        return buyerLastName;
    }

    public void setBuyerLastName(String buyerLastName) {
        this.buyerLastName = buyerLastName;
    }

    public String getBuyerPhone() {
        return buyerPhone;
    }

    public void setBuyerPhone(String buyerPhone) {
        this.buyerPhone = buyerPhone;
    }

    public double getBuyerMoney() {
        return buyerMoney;
    }

    public void setBuyerMoney(double buyerMoney) {
        this.buyerMoney = buyerMoney;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.id);
        hash = 29 * hash + Objects.hashCode(this.buyerFirstName);
        hash = 29 * hash + Objects.hashCode(this.buyerLastName);
        hash = 29 * hash + Objects.hashCode(this.buyerPhone);
        hash = 29 * hash + (int) (Double.doubleToLongBits(this.buyerMoney) ^ (Double.doubleToLongBits(this.buyerMoney) >>> 32));
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
        final Buyer other = (Buyer) obj;
        if (Double.doubleToLongBits(this.buyerMoney) != Double.doubleToLongBits(other.buyerMoney)) {
            return false;
        }
        if (!Objects.equals(this.buyerFirstName, other.buyerFirstName)) {
            return false;
        }
        if (!Objects.equals(this.buyerLastName, other.buyerLastName)) {
            return false;
        }
        if (!Objects.equals(this.buyerPhone, other.buyerPhone)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Buyer{" + "id=" + id + ", buyerFirstName=" + buyerFirstName + ", buyerLastName=" + buyerLastName + ", buyerPhone=" + buyerPhone + ", buyerMoney=" + buyerMoney + '}';
    }
    
    
}
