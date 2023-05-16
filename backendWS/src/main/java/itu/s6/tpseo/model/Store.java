package itu.s6.tpseo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import itu.s6.tpseo.model.token.Token;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@jakarta.persistence.Entity
@Getter
@Setter
@Table(name = "entity")
public class Store extends Entity {
    @OneToMany(mappedBy = "entity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Token> tokens;
    public void setPermission(int permission) {
        super.setPermission(50);
    }
}
