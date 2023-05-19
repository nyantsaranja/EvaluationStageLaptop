package custom.service;

import custom.repository.VStockTransferredByPointOfSaleRepo;
import custom.springutils.service.CrudService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import java.lang.Double;
import java.lang.Integer;
import java.lang.Long;
import custom.model.VStockTransferredByPointOfSale;


@Service
public class VStockTransferredByPointOfSaleService extends CrudService<VStockTransferredByPointOfSale, VStockTransferredByPointOfSaleRepo> {

    public VStockTransferredByPointOfSaleService(VStockTransferredByPointOfSaleRepo repo, EntityManager manager) {
        super(repo, manager);
    }

    @Override
    public Class<VStockTransferredByPointOfSale> getEntityClass() {
        return VStockTransferredByPointOfSale.class;
    }

}
