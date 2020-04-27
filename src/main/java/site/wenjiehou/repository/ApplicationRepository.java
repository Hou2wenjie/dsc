package site.wenjiehou.repository;
import org.springframework.data.repository.query.Param;
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

    @Query("select a from Application a where a.round.id = :id")
    List<Application> getAllByRoundId(@Param("id") Long id);
}
