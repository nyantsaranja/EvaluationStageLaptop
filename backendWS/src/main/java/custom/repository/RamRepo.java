package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Ram;

public interface RamRepo extends JpaRepository<Ram, Long> {
}
