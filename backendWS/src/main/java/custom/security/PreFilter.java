package custom.security;

import custom.service.StoreLoginService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter;

public class PreFilter extends AbstractPreAuthenticatedProcessingFilter {
    public PreFilter(StoreLoginService storeLoginService) {
        Manager manager = new Manager(storeLoginService);
        super.setAuthenticationManager(manager);
    }

    @Override
    protected Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    @Override
    protected Object getPreAuthenticatedCredentials(HttpServletRequest request) {
        return null;
    }
}
