package site.wenjiehou.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.client.HttpClientErrorException.Unauthorized;
import site.wenjiehou.domain.Profile;
import site.wenjiehou.repository.ProfileRepository;
import site.wenjiehou.repository.UserRepository;
import site.wenjiehou.security.SecurityUtils;
import site.wenjiehou.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link site.wenjiehou.domain.Profile}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfileResource {

    private final Logger log = LoggerFactory.getLogger(ProfileResource.class);

    private static final String ENTITY_NAME = "profile";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Autowired
    private UserRepository userRepository;

    private final ProfileRepository profileRepository;

    public ProfileResource(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    /**
     * {@code POST  /profiles} : Create a new profile.
     *
     * @param profile the profile to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profile, or with status {@code 400 (Bad Request)} if the profile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profiles")
    public ResponseEntity<Profile> createProfile(@Valid @RequestBody Profile profile) throws URISyntaxException {
        log.debug("REST request to save Profile : {}", profile);
        if (profile.getId() != null) {
            throw new BadRequestAlertException("A new profile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (SecurityUtils.isCurrentUserInRole("ROLE_Admin")){
            Profile result = profileRepository.save(profile);
            return ResponseEntity.created(new URI("/api/profiles/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
                .body(result);
        }else{
            profile.setUser(userRepository.getByLogin(SecurityUtils.getCurrentUserLogin().get()).get(0));
            Profile result = profileRepository.save(profile);
            return ResponseEntity.created(new URI("/api/profiles/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
                .body(result);
        }

    }

    /**
     * {@code PUT  /profiles} : Updates an existing profile.
     *
     * @param profile the profile to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profile,
     * or with status {@code 400 (Bad Request)} if the profile is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profile couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profiles")
    public ResponseEntity<Profile> updateProfile(@Valid @RequestBody Profile profile) throws URISyntaxException {
        log.debug("REST request to update Profile : {}", profile);
        if (profile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Profile result = profileRepository.save(profile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, profile.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profiles} : get all the profiles.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profiles in body.
     */
    @GetMapping("/profiles")
    public List<Profile> getAllProfiles() {
        log.debug("REST request to get all Profiles");
        if (SecurityUtils.isCurrentUserInRole("ROLE_ADMIN"))
            return profileRepository.findAll();
        else if (SecurityUtils.getCurrentUserLogin().isEmpty())
            throw new AccessDeniedException("You needs to login first");
        else
            return profileRepository.getByUserLogin(SecurityUtils.getCurrentUserLogin().get());

    }

    /**
     * {@code GET  /profiles/:id} : get the "id" profile.
     *
     * @param id the id of the profile to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profile, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profiles/{id}")
    public ResponseEntity<Profile> getProfile(@PathVariable Long id) {
        log.debug("REST request to get Profile : {}", id);
        Optional<Profile> profile = profileRepository.findById(id);
        if (SecurityUtils.getCurrentUserLogin().isEmpty())
            throw new AccessDeniedException("You needs to login first");
        if (profile.isPresent()){
            if (SecurityUtils.isCurrentUserInRole("ROLE_ADMIN"))
                return ResponseUtil.wrapOrNotFound(profile);
            else {
                if (profile.get().getUser().getLogin().equals(SecurityUtils.getCurrentUserLogin().get()))
                    return ResponseUtil.wrapOrNotFound(profile);
                else
                    throw new AccessDeniedException("You don't have the authority to do so");
            }
        } else
            return ResponseUtil.wrapOrNotFound(profile);
    }

    /**
     * {@code DELETE  /profiles/:id} : delete the "id" profile.
     *
     * @param id the id of the profile to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/profiles/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        log.debug("REST request to delete Profile : {}", id);
        profileRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
