package site.wenjiehou.repository;
import site.wenjiehou.domain.Application;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;


/**
 * Spring Data  repository for the Application entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> getByProfileUserLogin(String login);
}
