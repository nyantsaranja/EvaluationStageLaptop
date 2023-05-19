package custom.service;

import custom.repository.BrandRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.String;
import java.lang.Integer;
import custom.model.Brand;


@Service
public class BrandService extends CrudService<Brand, BrandRepo> {

    public BrandService(BrandRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<Brand> getEntityClass() {
        return Brand.class;
    }

}
