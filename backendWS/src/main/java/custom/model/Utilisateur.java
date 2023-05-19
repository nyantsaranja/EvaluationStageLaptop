package custom.model;

import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.String;
import java.sql.Date;
import java.lang.Integer;


@Getter
@Setter
@Entity
@Table(name = "utilisateur")
public class Utilisateur extends HasId {

	private String firstname;
	private Date birthdate;
	@ManyToOne()
	@JoinColumn(name = "entity_id")
	private Store entity;
	private String lastname;

}