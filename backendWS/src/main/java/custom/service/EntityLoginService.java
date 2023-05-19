package custom.service;

import custom.springutils.LoginRepo;
import custom.springutils.exception.CustomException;
import custom.springutils.service.LoginService;
import custom.model.Entity;
import custom.model.token.Token;
import custom.repository.TokenRepository;
import custom.model.Store;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Getter
@Setter
public class EntityLoginService<E extends Entity, R extends LoginRepo<E>> extends LoginService<E, R> {
    TokenRepository tokenRepo;

    public EntityLoginService(R repo, TokenRepository tokenRepo) {
        super(repo);
        this.tokenRepo = tokenRepo;
    }

    @Override
    public Token isConnected(String s) throws CustomException {
        Token token = this.tokenRepo.findByTokenValue(s);
        if (token == null) {
            throw new CustomException("invalid token");
        }
        return token;
    }

    @Override
    public void saveToken(String s, E e) {
        Token token = new Token();
        token.setTokenValue(s);
        token.setEntity((Store) e);
        token.setExpiration_date(Timestamp.valueOf(LocalDateTime.now().plusDays(1)));
        this.tokenRepo.save(token);
//        this.tokenRepo.save(new Token(s, e.getRole()));
    }

    @Override
    public boolean logout(String s) throws CustomException {
        Token token = this.tokenRepo.findByTokenValue(s);
        if (token == null) {
            throw new CustomException("You're not connected");
        }
        this.tokenRepo.delete(token);
        return true;
    }
}
