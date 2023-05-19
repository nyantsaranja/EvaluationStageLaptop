package custom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import custom.model.token.Token;
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
    @ManyToOne
    private Place place;
}
