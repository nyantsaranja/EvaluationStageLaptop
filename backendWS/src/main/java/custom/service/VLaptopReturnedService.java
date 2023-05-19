package custom.service;

import custom.repository.VLaptopReturnedRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Integer;
import java.lang.Long;
import custom.model.VLaptopReturned;


@Service
public class VLaptopReturnedService extends CrudService<VLaptopReturned, VLaptopReturnedRepo> {

    public VLaptopReturnedService(VLaptopReturnedRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VLaptopReturned> getEntityClass() {
        return VLaptopReturned.class;
    }

}
