package custom.model;

import custom.pdfutils.PDFColumn;
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
@Table(name = "v_sales_per_month_all")
public class VSalesPerMonthAll extends HasId {
	private Double total;
	private Integer month;

	@PDFColumn(value = "Total",width = 50, order = 1)
	public Double getTotal() {
		return total;
	}

	@PDFColumn(value = "Month",width = 50, order = 2)
	public Integer getMonth() {
		return month;
	}
}