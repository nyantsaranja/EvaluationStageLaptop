package custom.service;

import custom.repository.StorageRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Integer;
import java.lang.Double;
import custom.model.Storage;


@Service
public class StorageService extends CrudService<Storage, StorageRepo> {

    public StorageService(StorageRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Storage> getEntityClass() {
        return Storage.class;
    }

}
