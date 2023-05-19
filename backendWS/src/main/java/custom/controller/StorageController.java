package custom.controller;

import custom.springutils.controller.CrudController;
import custom.service.StorageService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.Storage;

@RestController
@RequestMapping("/storages")
public class StorageController extends CrudController<Storage, StorageService, Object> {

    public StorageController(StorageService service) {
        super(service);
    }

}
