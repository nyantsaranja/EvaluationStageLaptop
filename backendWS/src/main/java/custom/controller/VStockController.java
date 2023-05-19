package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.VStockService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VStock;

@RestController
@RequestMapping("/v-stocks")
public class VStockController extends CrudController<VStock, VStockService, VStock> {

    public VStockController(VStockService service) {
        super(service);
    }

}
