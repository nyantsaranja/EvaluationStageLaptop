package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.LossService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.Loss;

@RestController
@RequestMapping("/losses")
public class LossController extends CrudController<Loss, LossService, Object> {

    public LossController(LossService service) {
        super(service);
    }

}
