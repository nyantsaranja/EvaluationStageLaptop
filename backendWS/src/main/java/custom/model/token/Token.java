package custom.model.token;

import custom.springutils.model.HasId;
import custom.model.Store;
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
