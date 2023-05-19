package custom.service;

import custom.repository.VLaptopSentRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Integer;
import java.lang.String;
import java.sql.Timestamp;
import custom.model.VLaptopSent;


@Service
public class VLaptopSentService extends CrudService<VLaptopSent, VLaptopSentRepo> {

    public VLaptopSentService(VLaptopSentRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VLaptopSent> getEntityClass() {
        return VLaptopSent.class;
    }

}
