package itu.s6.tpseo.service;

import itu.s6.tpseo.framework.springutils.service.ServiceLogin;
import itu.s6.tpseo.model.Store;
import itu.s6.tpseo.repository.StoreRepository;
import itu.s6.tpseo.repository.TokenRepository;
import org.springframework.stereotype.Service;

@Service
public class StoreLoginService extends EntityLoginService<Store, StoreRepository> implements ServiceLogin<Store> {
    public StoreLoginService(StoreRepository repo, TokenRepository tokenRepo) {
        super(repo, tokenRepo);
    }
}
