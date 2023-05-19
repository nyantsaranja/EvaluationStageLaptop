package custom.service;

import custom.repository.RamRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Integer;
import java.lang.Double;
import custom.model.Ram;


@Service
public class RamService extends CrudService<Ram, RamRepo> {

    public RamService(RamRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Ram> getEntityClass() {
        return Ram.class;
    }

}
