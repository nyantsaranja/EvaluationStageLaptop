package custom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import custom.model.Utilisateur;

public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long> {
}
