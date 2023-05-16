package itu.s6.tpseo.security;

import itu.s6.tpseo.service.StoreLoginService;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Component
public class Config {
    private StoreLoginService storeLoginService;

    public Config(StoreLoginService storeLoginService) {
        this.storeLoginService = storeLoginService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        PreFilter preFilter = new PreFilter(storeLoginService);
        httpSecurity.cors().configurationSource(corsConfig()).and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        httpSecurity
                .cors()
                .and()
                .addFilter(preFilter)
                .authorizeHttpRequests(
                        (auhtz) ->
                                auhtz
                                        .requestMatchers(HttpMethod.POST, "/entity/login", "/entity/register").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/driver", "/brand", "/brand/{id}", "/vehicle", "/vehicule_type", "/vehicle/{id}","/checking/{id}").hasAuthority("ROLE_USER")
                                        .requestMatchers(HttpMethod.GET, "/store").permitAll()
                                        .requestMatchers(HttpMethod.DELETE, "/driver/logout", "/brand/{id}", "/vehicle/{id}","/checking/{id}").hasAuthority("ROLE_USER")
                                        .requestMatchers(HttpMethod.PUT, "/brand/{id}", "/vehicle/{id}","/checking/{id}").hasAuthority("ROLE_USER")
                                        .requestMatchers(HttpMethod.POST, "/brand", "/vehicle","/route","/vehicle_driver_route","/checking").hasAuthority("ROLE_USER")
                ).httpBasic();
        return httpSecurity.build();
    }

    public CorsConfigurationSource corsConfig() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedHeaders(List.of("*"));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedOrigins(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
