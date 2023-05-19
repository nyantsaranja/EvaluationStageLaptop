package custom.model;

import custom.pdfutils.PDFColumn;
import custom.springutils.model.HasId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.lang.Integer;
import java.lang.Double;


@Getter
@Setter
@Entity
@Table(name = "v_profit_per_month_all")
public class VProfitPerMonthAll extends HasId {

	private Integer month;
	private Double profit;

	@PDFColumn(value = "Month",width = 50, order = 1)
	public Integer getMonth() {
		return month;
	}

	@PDFColumn(value = "Profit",width = 50, order = 2)
	public Double getProfit() {
		return profit;
	}
}