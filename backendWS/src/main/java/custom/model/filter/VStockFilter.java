package custom.model.filter;

import custom.model.Laptop;
import custom.model.Store;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VStockFilter {
    private Laptop laptop;
    private Store sender;
}
