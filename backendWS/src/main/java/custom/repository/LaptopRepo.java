package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Laptop;

public interface LaptopRepo extends JpaRepository<Laptop, Long> {
}
