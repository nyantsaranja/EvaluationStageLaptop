package custom.service;

import custom.repository.VSalesPerSalepointRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.String;
import java.lang.Double;
import java.lang.Integer;
import custom.model.VSalesPerSalepoint;


@Service
public class VSalesPerSalepointService extends CrudService<VSalesPerSalepoint, VSalesPerSalepointRepo> {

    public VSalesPerSalepointService(VSalesPerSalepointRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VSalesPerSalepoint> getEntityClass() {
        return VSalesPerSalepoint.class;
    }

}
