package custom.model;

import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.Double;
import java.lang.Integer;
import custom.model.Laptop;
import java.sql.Timestamp;


@Getter
@Setter
@Entity
@Table(name = "loss")
public class Loss extends HasId {

	private Double quantity;
	@ManyToOne()
	@JoinColumn(name = "laptop_id")
	private Laptop laptop;
	private Timestamp lossDate;

}