package custom.controller;

import custom.model.filter.MovementDetailsFilter;
import custom.springutils.controller.CrudController;
import custom.service.MovementDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.MovementDetails;

@RestController
@RequestMapping("/movement-details")
public class MovementDetailsController extends CrudController<MovementDetails, MovementDetailsService, MovementDetailsFilter> {

    public MovementDetailsController(MovementDetailsService service) {
        super(service);
    }

}
