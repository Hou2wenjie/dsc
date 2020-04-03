package site.wenjiehou.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import site.wenjiehou.domain.enumeration.State;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
public class Application implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private State state;

    @Column(name = "jhi_end")
    private LocalDate end;

    @Column(name = "last_changed")
    private LocalDate lastChanged;

    @ManyToOne
    @JsonIgnoreProperties("applications")
    private Profile profile;

    @ManyToOne
    @JsonIgnoreProperties("applications")
    private Round round;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public State getState() {
        return state;
    }

    public Application state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public LocalDate getEnd() {
        return end;
    }

    public Application end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public LocalDate getLastChanged() {
        return lastChanged;
    }

    public Application lastChanged(LocalDate lastChanged) {
        this.lastChanged = lastChanged;
        return this;
    }

    public void setLastChanged(LocalDate lastChanged) {
        this.lastChanged = lastChanged;
    }

    public Profile getProfile() {
        return profile;
    }

    public Application profile(Profile profile) {
        this.profile = profile;
        return this;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Round getRound() {
        return round;
    }

    public Application round(Round round) {
        this.round = round;
        return this;
    }

    public void setRound(Round round) {
        this.round = round;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Application)) {
            return false;
        }
        return id != null && id.equals(((Application) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", end='" + getEnd() + "'" +
            ", lastChanged='" + getLastChanged() + "'" +
            "}";
    }
}
