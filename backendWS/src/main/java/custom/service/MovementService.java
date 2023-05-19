package custom.service;

import custom.repository.MovementRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Integer;
import java.lang.String;
import java.sql.Timestamp;
import custom.model.Movement;


@Service
public class MovementService extends CrudService<Movement, MovementRepo> {

    public MovementService(MovementRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Movement> getEntityClass() {
        return Movement.class;
    }

}
