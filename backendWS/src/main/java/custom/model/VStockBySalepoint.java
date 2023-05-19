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
import java.lang.Long;


@Getter
@Setter
@Entity
@Table(name = "v_stock_by_salepoint")
public class VStockBySalepoint extends HasId {

	private Double quantity;
	@ManyToOne()
	@JoinColumn(name = "receiver_id")
	private Store receiver;
	private Long id;
	@ManyToOne()
	@JoinColumn(name = "laptop_id")
	private Laptop laptop;

}