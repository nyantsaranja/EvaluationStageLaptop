package custom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import custom.springutils.model.HasId;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.lang.Integer;
import java.lang.String;
import java.sql.Timestamp;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "movement")
public class Movement extends HasId {
    @ManyToOne()
    @JoinColumn(name = "receiver_id")
    private Store receiver;
    private Integer parentId;
    private String description;
    private String reference;
    private Timestamp movementDate;
    private Integer type;
    @ManyToOne()
    @JoinColumn(name = "sender_id")
    private Store sender;

    @OneToMany(mappedBy = "movement")
    private List<MovementDetails> movementDetails;

    public void setMovementDate(Timestamp movementDate) {
        // movementDate cannot be in the future
        if (movementDate.after(new Timestamp(System.currentTimeMillis())))
            throw new IllegalArgumentException("Movement date cannot be in the future");
        this.movementDate = movementDate;
    }

}