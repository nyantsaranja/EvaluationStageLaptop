package custom.repository;

import custom.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepo extends JpaRepository<Place, Long> {
}
