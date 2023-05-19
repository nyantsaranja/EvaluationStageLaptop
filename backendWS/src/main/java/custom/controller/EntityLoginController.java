package custom.controller;

import custom.springutils.controller.LoginController;
import custom.model.Store;
import custom.service.StoreLoginService;
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
