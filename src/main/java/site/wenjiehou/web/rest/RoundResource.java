package site.wenjiehou.web.rest;

import site.wenjiehou.domain.Round;
import site.wenjiehou.repository.RoundRepository;
import site.wenjiehou.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link site.wenjiehou.domain.Round}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RoundResource {

    private final Logger log = LoggerFactory.getLogger(RoundResource.class);

    private static final String ENTITY_NAME = "round";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RoundRepository roundRepository;

    public RoundResource(RoundRepository roundRepository) {
        this.roundRepository = roundRepository;
    }

    /**
     * {@code POST  /rounds} : Create a new round.
     *
     * @param round the round to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new round, or with status {@code 400 (Bad Request)} if the round has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rounds")
    public ResponseEntity<Round> createRound(@RequestBody Round round) throws URISyntaxException {
        log.debug("REST request to save Round : {}", round);
        if (round.getId() != null) {
            throw new BadRequestAlertException("A new round cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Round result = roundRepository.save(round);
        return ResponseEntity.created(new URI("/api/rounds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rounds} : Updates an existing round.
     *
     * @param round the round to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated round,
     * or with status {@code 400 (Bad Request)} if the round is not valid,
     * or with status {@code 500 (Internal Server Error)} if the round couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rounds")
    public ResponseEntity<Round> updateRound(@RequestBody Round round) throws URISyntaxException {
        log.debug("REST request to update Round : {}", round);
        if (round.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Round result = roundRepository.save(round);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, round.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rounds} : get all the rounds.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rounds in body.
     */
    @GetMapping("/rounds")
    public List<Round> getAllRounds() {
        log.debug("REST request to get all Rounds");
        return roundRepository.findAll();
    }

    /**
     * {@code GET  /rounds/:id} : get the "id" round.
     *
     * @param id the id of the round to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the round, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rounds/{id}")
    public ResponseEntity<Round> getRound(@PathVariable Long id) {
        log.debug("REST request to get Round : {}", id);
        Optional<Round> round = roundRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(round);
    }

    /**
     * {@code DELETE  /rounds/:id} : delete the "id" round.
     *
     * @param id the id of the round to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rounds/{id}")
    public ResponseEntity<Void> deleteRound(@PathVariable Long id) {
        log.debug("REST request to delete Round : {}", id);
        roundRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
