package custom.springutils;

import java.util.List;

public interface LoginRepo<E extends LoginEntity> {
    List<E> findByEmail (String email);
    E save (E entity);
}
