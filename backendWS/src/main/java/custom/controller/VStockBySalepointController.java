package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.VStockBySalepointService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VStockBySalepoint;

@RestController
@RequestMapping("/v-stock-by-salepoints")
public class VStockBySalepointController extends CrudController<VStockBySalepoint, VStockBySalepointService, VStockBySalepoint> {

    public VStockBySalepointController(VStockBySalepointService service) {
        super(service);
    }

}
