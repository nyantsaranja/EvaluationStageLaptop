package custom.controller;

import custom.model.filter.ReturnedLaptopFilter;
import custom.springutils.controller.CrudController;
import custom.service.VLaptopReturnedService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VLaptopReturned;

@RestController
@RequestMapping("/v-laptop-returneds")
public class VLaptopReturnedController extends CrudController<VLaptopReturned, VLaptopReturnedService, ReturnedLaptopFilter> {

    public VLaptopReturnedController(VLaptopReturnedService service) {
        super(service);
    }

}
