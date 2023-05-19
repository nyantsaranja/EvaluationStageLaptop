package custom.model.filter;

import custom.model.Brand;
import custom.model.Processor;
import custom.model.Ram;
import custom.model.Storage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LaptopFilter {
    private Brand brand;
    private Processor processor;
    private Ram ram;
    private Storage storage;
}
