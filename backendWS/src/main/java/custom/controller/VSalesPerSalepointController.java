package custom.controller;

import custom.model.filter.VSalesPerSalepointsFilter;
import custom.springutils.controller.CrudController;
import custom.service.VSalesPerSalepointService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VSalesPerSalepoint;

@RestController
@RequestMapping("/v-sales-per-salepoints")
public class VSalesPerSalepointController extends CrudController<VSalesPerSalepoint, VSalesPerSalepointService, VSalesPerSalepointsFilter> {

    public VSalesPerSalepointController(VSalesPerSalepointService service) {
        super(service);
    }

}
