package custom.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import custom.springutils.model.HasId;
import jakarta.persistence.*;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.lang.String;
import java.lang.Integer;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "place")
public class Place extends HasId {

	private String name;

	@OneToMany(mappedBy = "place", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Store> stores;

}