package custom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.Double;
import java.lang.String;
import java.lang.Integer;
import custom.model.Laptop;
import custom.model.Movement;


@Getter
@Setter
@Entity
@Table(name = "movement_details")
public class MovementDetails extends HasId {

	private Double quantity;
	private String description;
	@ManyToOne()
	@JoinColumn(name = "laptop_id")
	private Laptop laptop;
	private Double unitprice;
	@ManyToOne()
	@JoinColumn(name = "movement_id")
    @JsonIgnore
	private Movement movement;

	public void setQuantity(Double quantity) {
		if (quantity < 0)
			throw new IllegalArgumentException("Quantity cannot be negative");
		this.quantity = quantity;
	}
}