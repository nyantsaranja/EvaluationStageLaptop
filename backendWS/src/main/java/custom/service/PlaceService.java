package custom.service;

import custom.repository.PlaceRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import custom.model.Place;


@Service
public class PlaceService extends CrudService<Place, PlaceRepo> {

    public PlaceService(PlaceRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Place> getEntityClass() {
        return Place.class;
    }

}
