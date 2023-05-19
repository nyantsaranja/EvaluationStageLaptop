package custom.service;

import custom.repository.ProcSupplierRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.String;
import java.lang.Integer;
import custom.model.ProcSupplier;


@Service
public class ProcSupplierService extends CrudService<ProcSupplier, ProcSupplierRepo> {

    public ProcSupplierService(ProcSupplierRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<ProcSupplier> getEntityClass() {
        return ProcSupplier.class;
    }

}
