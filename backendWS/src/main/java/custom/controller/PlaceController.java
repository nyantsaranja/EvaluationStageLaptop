package custom.controller;

import custom.model.Place;
import custom.model.filter.PlacesFilter;
import custom.service.PlaceService;
import custom.springutils.controller.CrudController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/places")
public class PlaceController extends CrudController<Place, PlaceService, PlacesFilter> {

    public PlaceController(PlaceService service) {
        super(service);
    }

}
