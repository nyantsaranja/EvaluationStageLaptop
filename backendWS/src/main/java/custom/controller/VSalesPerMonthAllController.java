package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.VSalesPerMonthAllService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VSalesPerMonthAll;

@RestController
@RequestMapping("/v-sales-per-month-alls")
public class VSalesPerMonthAllController extends CrudController<VSalesPerMonthAll, VSalesPerMonthAllService, Object> {


    public VSalesPerMonthAllController(VSalesPerMonthAllService service) {
        super(service, VSalesPerMonthAll.class);
    }
}
