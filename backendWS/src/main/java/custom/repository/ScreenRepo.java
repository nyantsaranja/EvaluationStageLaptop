package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Screen;

public interface ScreenRepo extends JpaRepository<Screen, Long> {
}
