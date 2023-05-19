package custom.security;

import custom.service.StoreLoginService;
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
                                        .requestMatchers(HttpMethod.POST, "/entity/login", "/entity/register","/movements","/movements/receive-and-send-back").permitAll()
                                        .requestMatchers(HttpMethod.GET,  "/vehicle/{id}","/checking/{id}").permitAll()
                                        .requestMatchers(HttpMethod.GET, "/brands", "/processors", "/screens", "/proc-suppliers", "/laptops","/stores","/storages","/rams","/places","/utilisateurs","/movements","/v-stocks","/v-stock-transferred-by-point-of-sales","/v-laptop-sents","/movement-details","/v-laptop-returneds","/v-stock-by-salepoints","/v-sales-per-month-alls","/v-sales-per-month-alls/pdf","/v-sales-per-month-cross-sellers","/v-sales-per-month-cross-sellers/pdf","/v-profit-per-month-alls","/v-profit-per-month-alls/pdf","/v-sales-per-salepoints").permitAll()
                                        .requestMatchers(HttpMethod.DELETE, "/driver/logout", "/brands/{id}", "/laptops/{id}","/processors/{id}","/stores/{id}","/screens/{id}","/places/{id}","/utilisateurs/{id}").permitAll()
                                        .requestMatchers(HttpMethod.PUT, "/brands/{id}", "/laptops/{id}","/processors/{id}","/stores/{id}","/screens/{id}","/places/{id}","/utilisateurs/{id}").permitAll()
                                        .requestMatchers(HttpMethod.POST, "/brands", "/laptops","/processors","/screens","/stores","/places","/utilisateurs","/movements/confirm-receive").permitAll()
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
