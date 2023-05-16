package itu.s6.tpseo.model.token;

import itu.s6.tpseo.framework.springutils.model.HasId;
import itu.s6.tpseo.model.Store;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
public class Token extends HasId {
    @ManyToOne
    private Store entity;
    private String tokenValue;
    private Timestamp expiration_date;

}
