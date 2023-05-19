package custom.model;

import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.String;
import custom.model.Screen;
import java.lang.Integer;
import custom.model.Storage;
import custom.model.Brand;
import custom.model.Processor;
import custom.model.Ram;


@Getter
@Setter
@Entity
@Table(name = "laptop")
public class Laptop extends HasId {

	private String photo;
	@ManyToOne()
	@JoinColumn(name = "screen_id")
	private Screen screen;
	private String model;
	@ManyToOne()
	@JoinColumn(name = "storage_id")
	private Storage storage;
	@ManyToOne()
	@JoinColumn(name = "brand_id")
	private Brand brand;
	@ManyToOne()
	@JoinColumn(name = "processor_id")
	private Processor processor;
	@ManyToOne()
	@JoinColumn(name = "ram_id")
	private Ram ram;

}