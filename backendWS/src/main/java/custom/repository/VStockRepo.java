package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.VStock;

public interface VStockRepo extends JpaRepository<VStock, Long> {
}
