package custom.model;

import custom.model.parent.MyUserCredential;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public class Entity extends MyUserCredential {
    private int permission;
}
