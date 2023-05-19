package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.VSalesPerMonthAll;

public interface VSalesPerMonthAllRepo extends JpaRepository<VSalesPerMonthAll, Long> {
}
