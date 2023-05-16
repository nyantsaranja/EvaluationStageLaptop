package itu.s6.tpseo.controller;

import itu.s6.tpseo.framework.springutils.controller.LoginController;
import itu.s6.tpseo.model.Store;
import itu.s6.tpseo.service.StoreLoginService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/entity")
public class EntityLoginController extends LoginController<Store, StoreLoginService> {

    public EntityLoginController(StoreLoginService service) {
        super(service);
    }

    @Override
    public String getRequestHeaderKey() {
        return "Authorization";
    }
}
