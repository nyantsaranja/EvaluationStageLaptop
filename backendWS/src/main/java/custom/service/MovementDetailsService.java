package custom.service;

import custom.repository.MovementDetailsRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.String;
import java.lang.Integer;
import custom.model.Laptop;
import custom.model.Movement;
import custom.model.MovementDetails;


@Service
public class MovementDetailsService extends CrudService<MovementDetails, MovementDetailsRepo> {

    public MovementDetailsService(MovementDetailsRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<MovementDetails> getEntityClass() {
        return MovementDetails.class;
    }

}
