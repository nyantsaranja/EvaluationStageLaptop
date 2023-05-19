package custom.controller;

import custom.model.filter.BrandFilter;
import custom.springutils.controller.CrudController;
import custom.service.BrandService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.Brand;

@RestController
@RequestMapping("/brands")
public class BrandController extends CrudController<Brand, BrandService, BrandFilter> {

    public BrandController(BrandService service) {
        super(service);
    }

}
