package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.ProcSupplierService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.ProcSupplier;

@RestController
@RequestMapping("/proc-suppliers")
public class ProcSupplierController extends CrudController<ProcSupplier, ProcSupplierService, Object> {

    public ProcSupplierController(ProcSupplierService service) {
        super(service);
    }

}
