package custom.model;

import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.Double;
import java.lang.Long;
import java.lang.Integer;


@Getter
@Setter
@Entity
@Table(name = "v_stock")
public class VStock extends HasId {

	private Double quantity;
	private Long id;
	@ManyToOne()
	@JoinColumn(name = "laptop_id")
	private Laptop laptop;

	@ManyToOne()
	@JoinColumn(name = "sender_id")
	private Store sender;

}