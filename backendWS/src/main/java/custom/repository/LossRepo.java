package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Loss;

public interface LossRepo extends JpaRepository<Loss, Long> {
}
