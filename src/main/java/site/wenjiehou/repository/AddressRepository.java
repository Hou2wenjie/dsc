package site.wenjiehou.repository;
import java.util.List;
import site.wenjiehou.domain.Address;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Address entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> getById(String id );
    List<Address> getByProfileUserLogin(String login);
}
