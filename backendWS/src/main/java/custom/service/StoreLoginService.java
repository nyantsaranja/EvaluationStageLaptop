package custom.service;

import custom.repository.StoreRepository;
import custom.repository.TokenRepository;
import custom.springutils.service.ServiceLogin;
import custom.model.Store;
import org.springframework.stereotype.Service;

@Service
public class StoreLoginService extends EntityLoginService<Store, StoreRepository> implements ServiceLogin<Store> {
    public StoreLoginService(StoreRepository repo, TokenRepository tokenRepo) {
        super(repo, tokenRepo);
    }
}
