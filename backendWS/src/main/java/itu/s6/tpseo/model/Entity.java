package itu.s6.tpseo.model;

import itu.s6.tpseo.model.parent.MyUserCredential;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public class Entity extends MyUserCredential {
    private int permission;
}
