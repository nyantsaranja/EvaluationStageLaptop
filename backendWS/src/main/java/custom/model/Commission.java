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


@Getter
@Setter
@Entity
@Table(name = "commission")
public class Commission extends HasId {

	private Double maxPrice;
	private Double minPrice;
	private Double value;

}