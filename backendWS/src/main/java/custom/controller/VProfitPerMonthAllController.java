package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.VProfitPerMonthAllService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VProfitPerMonthAll;

@RestController
@RequestMapping("/v-profit-per-month-alls")
public class VProfitPerMonthAllController extends CrudController<VProfitPerMonthAll, VProfitPerMonthAllService, Object> {

    public VProfitPerMonthAllController(VProfitPerMonthAllService service) {
        super(service, VProfitPerMonthAll.class);
    }

}
