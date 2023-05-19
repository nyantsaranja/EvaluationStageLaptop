package custom.service;

import custom.repository.ScreenRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Integer;
import custom.model.Screen;


@Service
public class ScreenService extends CrudService<Screen, ScreenRepo> {

    public ScreenService(ScreenRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Screen> getEntityClass() {
        return Screen.class;
    }

}
