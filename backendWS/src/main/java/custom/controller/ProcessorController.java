package custom.controller;

import custom.model.Processor;
import custom.model.filter.ProcessorFilter;
import custom.springutils.controller.CrudController;
import custom.service.ProcessorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/processors")
public class ProcessorController extends CrudController<Processor, ProcessorService, ProcessorFilter> {

    public ProcessorController(ProcessorService service) {
        super(service);
    }

}
