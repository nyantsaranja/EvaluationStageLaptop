package custom.springutils.controller;


import custom.springutils.LoginEntity;
import custom.springutils.service.ServiceLogin;
import custom.springutils.util.ControllerUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;

public abstract class LoginController <E extends LoginEntity, S extends ServiceLogin<E>> {

    protected S service;

    public LoginController(S service) {
        this.service = service;
    }

    public abstract String getRequestHeaderKey ();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody E entity) throws Exception {
//        return ResponseEntity.ok("Mety");
        return ControllerUtil.returnSuccess(service.login(entity), HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) throws Exception {
        return ControllerUtil.returnSuccess(service.logout(request.getHeader(getRequestHeaderKey()).substring(7)), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody E entity) throws Exception {
        return ControllerUtil.returnSuccess(service.register(entity), HttpStatus.OK);
    }

}
