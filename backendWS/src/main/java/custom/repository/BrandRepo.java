package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Brand;

public interface BrandRepo extends JpaRepository<Brand, Long> {
}
