package custom.service;

import custom.repository.VSalesPerMonthCrossSellerRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Integer;
import custom.model.VSalesPerMonthCrossSeller;


@Service
public class VSalesPerMonthCrossSellerService extends CrudService<VSalesPerMonthCrossSeller, VSalesPerMonthCrossSellerRepo> {

    public VSalesPerMonthCrossSellerService(VSalesPerMonthCrossSellerRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VSalesPerMonthCrossSeller> getEntityClass() {
        return VSalesPerMonthCrossSeller.class;
    }

}
