package custom.service;

import custom.repository.LaptopRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.String;
import custom.model.Screen;
import java.lang.Integer;
import custom.model.Storage;
import custom.model.Brand;
import custom.model.Processor;
import custom.model.Ram;
import custom.model.Laptop;


@Service
public class LaptopService extends CrudService<Laptop, LaptopRepo> {

    public LaptopService(LaptopRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Laptop> getEntityClass() {
        return Laptop.class;
    }

}
