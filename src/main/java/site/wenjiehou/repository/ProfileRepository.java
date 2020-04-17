package site.wenjiehou.repository;
import java.util.List;
import site.wenjiehou.domain.Profile;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Profile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    List<Profile> getByUserLogin(String login);
}
