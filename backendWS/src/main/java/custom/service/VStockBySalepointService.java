package custom.service;

import custom.repository.VStockBySalepointRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Integer;
import java.lang.Long;
import custom.model.VStockBySalepoint;


@Service
public class VStockBySalepointService extends CrudService<VStockBySalepoint, VStockBySalepointRepo> {

    public VStockBySalepointService(VStockBySalepointRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VStockBySalepoint> getEntityClass() {
        return VStockBySalepoint.class;
    }

}
