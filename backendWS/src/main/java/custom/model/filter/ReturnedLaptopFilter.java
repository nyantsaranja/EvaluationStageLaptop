package custom.model.filter;

import custom.model.Laptop;
import custom.model.Store;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReturnedLaptopFilter {
    Laptop laptop;

    private Store receiver;
}
