package custom.service;

import custom.repository.StoreRepository;
import custom.springutils.service.CrudService;
import custom.model.Store;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;

@Service
public class StoreService extends CrudService<Store, StoreRepository> {
    public StoreService(StoreRepository repository, EntityManager entityManager) {
        super(repository, entityManager);
    }

    @Override
    public Class<Store> getEntityClass() {
        return Store.class;
    }
}
