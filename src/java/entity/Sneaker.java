/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author Deniss
 */
@Entity
public class Sneaker{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String sneakerModel;
    private String sneakerFirm;
    private int sneakerSize;
    private double sneakerPrice;
    private String description;
    private int sneakerQuantity;
    private String imgLink;

    public Sneaker() {
    }

    @Override
    public String toString() {
        return "Sneaker{" + "id=" + id + ", sneakerModel=" + sneakerModel + ", sneakerFirm=" + sneakerFirm + ", sneakerSize=" + sneakerSize + ", sneakerPrice=" + sneakerPrice + ", description=" + description + ", sneakerQuantity=" + sneakerQuantity + ", imgLink=" + imgLink + '}';
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 61 * hash + Objects.hashCode(this.id);
        hash = 61 * hash + Objects.hashCode(this.sneakerModel);
        hash = 61 * hash + Objects.hashCode(this.sneakerFirm);
        hash = 61 * hash + this.sneakerSize;
        hash = 61 * hash + (int) (Double.doubleToLongBits(this.sneakerPrice) ^ (Double.doubleToLongBits(this.sneakerPrice) >>> 32));
        hash = 61 * hash + Objects.hashCode(this.description);
        hash = 61 * hash + this.sneakerQuantity;
        hash = 61 * hash + Objects.hashCode(this.imgLink);
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
        final Sneaker other = (Sneaker) obj;
        if (this.sneakerSize != other.sneakerSize) {
            return false;
        }
        if (Double.doubleToLongBits(this.sneakerPrice) != Double.doubleToLongBits(other.sneakerPrice)) {
            return false;
        }
        if (this.sneakerQuantity != other.sneakerQuantity) {
            return false;
        }
        if (!Objects.equals(this.sneakerModel, other.sneakerModel)) {
            return false;
        }
        if (!Objects.equals(this.sneakerFirm, other.sneakerFirm)) {
            return false;
        }
        if (!Objects.equals(this.description, other.description)) {
            return false;
        }
        if (!Objects.equals(this.imgLink, other.imgLink)) {
            return false;
        }
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSneakerModel() {
        return sneakerModel;
    }

    public void setSneakerModel(String sneakerModel) {
        this.sneakerModel = sneakerModel;
    }

    public String getSneakerFirm() {
        return sneakerFirm;
    }

    public void setSneakerFirm(String sneakerFirm) {
        this.sneakerFirm = sneakerFirm;
    }

    public int getSneakerSize() {
        return sneakerSize;
    }

    public void setSneakerSize(int sneakerSize) {
        this.sneakerSize = sneakerSize;
    }

    public double getSneakerPrice() {
        return sneakerPrice;
    }

    public void setSneakerPrice(double sneakerPrice) {
        this.sneakerPrice = sneakerPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSneakerQuantity() {
        return sneakerQuantity;
    }

    public void setSneakerQuantity(int sneakerQuantity) {
        this.sneakerQuantity = sneakerQuantity;
    }

    public String getImgLink() {
        return imgLink;
    }

    public void setImgLink(String imgLink) {
        this.imgLink = imgLink;
    }

}
