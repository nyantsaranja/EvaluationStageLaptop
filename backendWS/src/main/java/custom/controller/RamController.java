package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.RamService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.Ram;

@RestController
@RequestMapping("/rams")
public class RamController extends CrudController<Ram, RamService, Object> {

    public RamController(RamService service) {
        super(service);
    }

}
