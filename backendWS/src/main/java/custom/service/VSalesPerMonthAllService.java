package custom.service;

import custom.repository.VSalesPerMonthAllRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Integer;
import custom.model.VSalesPerMonthAll;


@Service
public class VSalesPerMonthAllService extends CrudService<VSalesPerMonthAll, VSalesPerMonthAllRepo> {

    public VSalesPerMonthAllService(VSalesPerMonthAllRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VSalesPerMonthAll> getEntityClass() {
        return VSalesPerMonthAll.class;
    }

}
