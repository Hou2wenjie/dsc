package site.wenjiehou.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Round.
 */
@Entity
@Table(name = "round")
public class Round implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "start_time")
    private LocalDate startTime;

    @Column(name = "end_time")
    private LocalDate endTime;

    @Column(name = "max_cap")
    private Integer maxCap;

    @Column(name = "current_cap")
    private Integer currentCap;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getStartTime() {
        return startTime;
    }

    public Round startTime(LocalDate startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(LocalDate startTime) {
        this.startTime = startTime;
    }

    public LocalDate getEndTime() {
        return endTime;
    }

    public Round endTime(LocalDate endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(LocalDate endTime) {
        this.endTime = endTime;
    }

    public Integer getMaxCap() {
        return maxCap;
    }

    public Round maxCap(Integer maxCap) {
        this.maxCap = maxCap;
        return this;
    }

    public void setMaxCap(Integer maxCap) {
        this.maxCap = maxCap;
    }

    public Integer getCurrentCap() {
        return currentCap;
    }

    public Round currentCap(Integer currentCap) {
        this.currentCap = currentCap;
        return this;
    }

    public void setCurrentCap(Integer currentCap) {
        this.currentCap = currentCap;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Round)) {
            return false;
        }
        return id != null && id.equals(((Round) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Round{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", maxCap=" + getMaxCap() +
            ", currentCap=" + getCurrentCap() +
            "}";
    }
}
