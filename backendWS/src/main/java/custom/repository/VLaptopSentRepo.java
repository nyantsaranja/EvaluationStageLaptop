package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.VLaptopSent;

public interface VLaptopSentRepo extends JpaRepository<VLaptopSent, Long> {
}
