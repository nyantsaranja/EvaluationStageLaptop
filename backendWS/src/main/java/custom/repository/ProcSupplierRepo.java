package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.ProcSupplier;

public interface ProcSupplierRepo extends JpaRepository<ProcSupplier, Long> {
}
