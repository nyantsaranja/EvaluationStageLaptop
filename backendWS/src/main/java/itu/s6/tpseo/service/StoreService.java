package itu.s6.tpseo.service;

import itu.s6.tpseo.framework.springutils.service.CrudService;
import itu.s6.tpseo.model.Store;
import itu.s6.tpseo.repository.StoreRepository;
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
