package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.VStockTransferredByPointOfSale;

public interface VStockTransferredByPointOfSaleRepo extends JpaRepository<VStockTransferredByPointOfSale, Long> {
}
