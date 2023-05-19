package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Movement;

public interface MovementRepo extends JpaRepository<Movement, Long> {
}
