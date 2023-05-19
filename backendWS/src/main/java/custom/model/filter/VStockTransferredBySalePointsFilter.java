package custom.model.filter;

import custom.model.Laptop;
import custom.model.Store;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VStockTransferredBySalePointsFilter {
    private Laptop laptop;
    private Store receiver;
    private Store sender;
}
