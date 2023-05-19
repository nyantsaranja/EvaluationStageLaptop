package custom.repository;

import custom.springutils.LoginRepo;
import custom.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long>, LoginRepo<Store> {
}
