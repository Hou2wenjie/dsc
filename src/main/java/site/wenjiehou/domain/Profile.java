package site.wenjiehou.domain;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import site.wenjiehou.domain.enumeration.Gender;

/**
 * A Profile.
 */
@Entity
@Table(name = "profile")
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @NotNull
    @Min(value = 18)
    @Column(name = "age", nullable = false)
    private Integer age;

    @NotNull
    @Column(name = "phone_nr", nullable = false)
    private String phoneNr;

    
    @Lob
    @Column(name = "reseme", nullable = false)
    private byte[] reseme;

    @Column(name = "reseme_content_type", nullable = false)
    private String resemeContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne
    @JoinColumn(unique = true)
    private Address address;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Profile name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Gender getGender() {
        return gender;
    }

    public Profile gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Integer getAge() {
        return age;
    }

    public Profile age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPhoneNr() {
        return phoneNr;
    }

    public Profile phoneNr(String phoneNr) {
        this.phoneNr = phoneNr;
        return this;
    }

    public void setPhoneNr(String phoneNr) {
        this.phoneNr = phoneNr;
    }

    public byte[] getReseme() {
        return reseme;
    }

    public Profile reseme(byte[] reseme) {
        this.reseme = reseme;
        return this;
    }

    public void setReseme(byte[] reseme) {
        this.reseme = reseme;
    }

    public String getResemeContentType() {
        return resemeContentType;
    }

    public Profile resemeContentType(String resemeContentType) {
        this.resemeContentType = resemeContentType;
        return this;
    }

    public void setResemeContentType(String resemeContentType) {
        this.resemeContentType = resemeContentType;
    }

    public User getUser() {
        return user;
    }

    public Profile user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Address getAddress() {
        return address;
    }

    public Profile address(Address address) {
        this.address = address;
        return this;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profile)) {
            return false;
        }
        return id != null && id.equals(((Profile) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Profile{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", gender='" + getGender() + "'" +
            ", age=" + getAge() +
            ", phoneNr='" + getPhoneNr() + "'" +
            ", reseme='" + getReseme() + "'" +
            ", resemeContentType='" + getResemeContentType() + "'" +
            "}";
    }
}
