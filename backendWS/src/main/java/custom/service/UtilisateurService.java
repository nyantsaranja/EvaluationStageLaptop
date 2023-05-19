package custom.service;

import custom.repository.UtilisateurRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.String;
import java.sql.Date;
import java.lang.Integer;
import custom.model.Utilisateur;


@Service
public class UtilisateurService extends CrudService<Utilisateur, UtilisateurRepo> {

    public UtilisateurService(UtilisateurRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Utilisateur> getEntityClass() {
        return Utilisateur.class;
    }

}
