package custom.security;

import custom.springutils.exception.CustomException;
import custom.model.token.Token;
import custom.service.StoreLoginService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public class Manager implements AuthenticationManager {
    private StoreLoginService storeLoginService;

    public Manager(StoreLoginService storeLoginService) {
        this.storeLoginService = storeLoginService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = authentication.getPrincipal().toString();
        token = token.substring(7);
        List<GrantedAuthority> authorities = new ArrayList<>();
        try {
            Token personToken = storeLoginService.isConnected(token);
            if (personToken != null) {
                if (personToken.getEntity().getPermission() > 0) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                }
                authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                authentication = new UsernamePasswordAuthenticationToken(token, null, authorities);
            }
        } catch (CustomException e) {
            return authentication;
        }
        return authentication;
    }
}
