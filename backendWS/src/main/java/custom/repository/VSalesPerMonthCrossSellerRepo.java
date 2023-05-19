package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.VSalesPerMonthCrossSeller;

public interface VSalesPerMonthCrossSellerRepo extends JpaRepository<VSalesPerMonthCrossSeller, Long> {
}
