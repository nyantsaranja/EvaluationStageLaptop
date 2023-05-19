package custom.springutils.service;


import custom.springutils.AuthenticatedDetails;
import custom.springutils.LoginEntity;
import custom.model.token.Token;

public interface ServiceLogin<E extends LoginEntity> {

    AuthenticatedDetails<E> login(E entity) throws Exception;
    Token isConnected (String token) throws Exception;
    void saveToken (String token, E owner) throws Exception;
    boolean logout (String token) throws Exception;
    E register(E entity) throws Exception;
    
}
