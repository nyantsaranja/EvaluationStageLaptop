package custom.model;

import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.String;
import java.lang.Double;
import java.lang.Integer;


@Getter
@Setter
@Entity
@Table(name = "v_sales_per_salepoint")
public class VSalesPerSalepoint extends HasId {

	private String reference;
	private Double total;
	private Double quantity;
	@ManyToOne()
	@JoinColumn(name = "sender_id")
	private Store sender;

}