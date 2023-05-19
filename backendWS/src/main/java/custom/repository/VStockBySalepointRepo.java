package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.VStockBySalepoint;

public interface VStockBySalepointRepo extends JpaRepository<VStockBySalepoint, Long> {
}
