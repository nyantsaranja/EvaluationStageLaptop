package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.MovementDetails;

public interface MovementDetailsRepo extends JpaRepository<MovementDetails, Long> {
}
