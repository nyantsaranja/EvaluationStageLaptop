package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.VSalesPerSalepoint;

public interface VSalesPerSalepointRepo extends JpaRepository<VSalesPerSalepoint, Long> {
}
