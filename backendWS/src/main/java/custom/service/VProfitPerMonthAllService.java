package custom.service;

import custom.repository.VProfitPerMonthAllRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Integer;
import java.lang.Double;
import custom.model.VProfitPerMonthAll;


@Service
public class VProfitPerMonthAllService extends CrudService<VProfitPerMonthAll, VProfitPerMonthAllRepo> {

    public VProfitPerMonthAllService(VProfitPerMonthAllRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VProfitPerMonthAll> getEntityClass() {
        return VProfitPerMonthAll.class;
    }

}
