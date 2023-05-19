package custom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class TpSeoApplication {

    public static void main(String[] args) {
        SpringApplication.run(TpSeoApplication.class, args);
    }

}
