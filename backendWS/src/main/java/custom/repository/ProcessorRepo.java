package custom.repository;

import custom.model.Processor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessorRepo extends JpaRepository<Processor, Long> {
}
