package custom.controller;

import custom.model.filter.UtilisateurFilter;
import custom.springutils.controller.CrudController;
import custom.service.UtilisateurService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import custom.model.Utilisateur;

@RestController
@RequestMapping("/utilisateurs")
public class UtilisateurController extends CrudController<Utilisateur, UtilisateurService, UtilisateurFilter> {

    public UtilisateurController(UtilisateurService service) {
        super(service);
    }

}
