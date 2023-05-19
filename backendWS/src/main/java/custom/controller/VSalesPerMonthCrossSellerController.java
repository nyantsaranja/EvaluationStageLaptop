package custom.controller;

import custom.model.filter.SalesPerMonthPerSalePointFilter;
import custom.springutils.controller.CrudController;
import custom.service.VSalesPerMonthCrossSellerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VSalesPerMonthCrossSeller;

@RestController
@RequestMapping("/v-sales-per-month-cross-sellers")
public class VSalesPerMonthCrossSellerController extends CrudController<VSalesPerMonthCrossSeller, VSalesPerMonthCrossSellerService, SalesPerMonthPerSalePointFilter> {

    public VSalesPerMonthCrossSellerController(VSalesPerMonthCrossSellerService service) {
        super(service, VSalesPerMonthCrossSeller.class);
    }

}
