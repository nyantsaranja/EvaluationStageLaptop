package custom.controller;

import custom.model.filter.ScreenFilter;
import custom.springutils.controller.CrudController;
import custom.service.ScreenService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.Screen;

@RestController
@RequestMapping("/screens")
public class ScreenController extends CrudController<Screen, ScreenService, ScreenFilter> {

    public ScreenController(ScreenService service) {
        super(service);
    }

}
