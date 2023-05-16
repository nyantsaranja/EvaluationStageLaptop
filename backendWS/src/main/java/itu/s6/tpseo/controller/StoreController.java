package itu.s6.tpseo.controller;

import itu.s6.tpseo.framework.springutils.controller.CrudController;
import itu.s6.tpseo.model.Store;
import itu.s6.tpseo.service.StoreService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/store")
public class StoreController extends CrudController<Store, StoreService,Object> {
    public StoreController(StoreService service) {
        super(service);
    }
}
