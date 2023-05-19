package custom.service;

import custom.repository.CommissionRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Integer;
import custom.model.Commission;


@Service
public class CommissionService extends CrudService<Commission, CommissionRepo> {

    public CommissionService(CommissionRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Commission> getEntityClass() {
        return Commission.class;
    }

}
