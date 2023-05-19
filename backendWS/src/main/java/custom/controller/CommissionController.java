package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.CommissionService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.Commission;

@RestController
@RequestMapping("/commissions")
public class CommissionController extends CrudController<Commission, CommissionService, Object> {

    public CommissionController(CommissionService service) {
        super(service);
    }

}
