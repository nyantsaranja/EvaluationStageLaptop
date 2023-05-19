package custom.model;

import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.Integer;
import java.lang.String;
import java.sql.Timestamp;


@Getter
@Setter
@Entity
@Table(name = "v_laptop_sent")
public class VLaptopSent extends HasId {
	@ManyToOne()
	@JoinColumn(name = "receiver_id")
	private Store receiver;
	private Integer parentId;
	private String description;
	private Timestamp movementDate;
	private Integer type;
	@ManyToOne()
	@JoinColumn(name = "sender_id")
	private Store sender;

}