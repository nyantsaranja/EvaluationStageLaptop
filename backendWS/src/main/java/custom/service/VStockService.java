package custom.service;

import custom.repository.VStockRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Long;
import java.lang.Integer;
import custom.model.VStock;


@Service
public class VStockService extends CrudService<VStock, VStockRepo> {

    public VStockService(VStockRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VStock> getEntityClass() {
        return VStock.class;
    }

}
