package itu.s6.tpseo.repository;

import itu.s6.tpseo.framework.springutils.LoginRepo;
import itu.s6.tpseo.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long>, LoginRepo<Store> {
}
