package custom.controller;

import custom.model.filter.LaptopFilter;
import custom.springutils.controller.CrudController;
import custom.service.LaptopService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.Laptop;

@RestController
@RequestMapping("/laptops")
public class LaptopController extends CrudController<Laptop, LaptopService, LaptopFilter> {

    public LaptopController(LaptopService service) {
        super(service);
    }

}
