package custom.controller;

import custom.model.filter.VLaptopSentFilter;
import custom.springutils.controller.CrudController;
import custom.service.VLaptopSentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.VLaptopSent;

@RestController
@RequestMapping("/v-laptop-sents")
public class VLaptopSentController extends CrudController<VLaptopSent, VLaptopSentService, VLaptopSentFilter> {

    public VLaptopSentController(VLaptopSentService service) {
        super(service);
    }

}
