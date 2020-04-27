package site.wenjiehou.repository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import site.wenjiehou.domain.Round;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Round entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {

    @Transactional
    @Modifying
    @Query("update Round r set r.currentCap = r.currentCap + 1 where r.id = :id")
    void addCapToRound(@Param("id") Long roundId);
}
