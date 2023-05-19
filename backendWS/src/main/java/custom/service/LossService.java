package custom.service;

import custom.repository.LossRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Integer;
import custom.model.Laptop;
import java.sql.Timestamp;
import custom.model.Loss;


@Service
public class LossService extends CrudService<Loss, LossRepo> {

    public LossService(LossRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Loss> getEntityClass() {
        return Loss.class;
    }

}
