package custom.controller;

import custom.model.filter.VStockTransferredBySalePointsFilter;
import custom.springutils.controller.CrudController;
import custom.service.VStockTransferredByPointOfSaleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VStockTransferredByPointOfSale;

@RestController
@RequestMapping("/v-stock-transferred-by-point-of-sales")
public class VStockTransferredByPointOfSaleController extends CrudController<VStockTransferredByPointOfSale, VStockTransferredByPointOfSaleService, VStockTransferredBySalePointsFilter> {

    public VStockTransferredByPointOfSaleController(VStockTransferredByPointOfSaleService service) {
        super(service);
    }

}
