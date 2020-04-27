package site.wenjiehou.repository;
import java.util.List;
import java.util.Optional;
import site.wenjiehou.domain.Profile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Profile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> getByUserLogin(String name);
}
