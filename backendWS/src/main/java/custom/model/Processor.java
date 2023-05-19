package custom.model;

import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.String;
import custom.model.ProcSupplier;
import java.lang.Integer;


@Getter
@Setter
@Entity
@Table(name = "processor")
public class Processor extends HasId {

	private String name;
	@ManyToOne()
	@JoinColumn(name = "proc_supplier_id")
	private ProcSupplier procsupplier;

}