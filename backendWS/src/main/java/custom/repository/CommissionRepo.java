package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Commission;

public interface CommissionRepo extends JpaRepository<Commission, Long> {
}
