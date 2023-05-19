package custom.controller;

import custom.model.filter.PointOfSaleFilter;
import custom.springutils.controller.CrudController;
import custom.model.Store;
import custom.service.StoreService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stores")
public class StoreController extends CrudController<Store, StoreService, PointOfSaleFilter> {
    public StoreController(StoreService service) {
        super(service);
    }
}
