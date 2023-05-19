package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Storage;

public interface StorageRepo extends JpaRepository<Storage, Long> {
}
