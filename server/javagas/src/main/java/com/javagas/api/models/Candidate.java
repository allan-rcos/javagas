package com.javagas.api.models;

import com.javagas.api.dto.CandidateDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A Candidate User.
 * <p>
 * this entity inherits the User Class and complement with Candidate Only
 * Fields.Have a {@link com.javagas.api.utils.CandidateAuthority
 * Candidate Authority} And can:
 * <ul>
 *     <li>Apply to Jobs;</li>
 *     <li>Have Skills;</li>
 *     <li>See Jobs all.</li>
 * </ul>
 * </p>
 *
 * @see User Main User
 * @see Company Company Only Fields
 * @since 0.2
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    /**
     * A Join ID Table that will referer to the Main User class.
     *
     * @since 0.2
     */
    @Id
    private Long id;
    /**
     * Candidate First Name.
     *
     * @since 0.2
     */
    private String firstName;
    /**
     * Candidate Last Name.
     *
     * @since 0.2
     */
    private String lastName;
    /**
     * A URL to the user LinkedIn Account.
     *
     * @since 0.2
     */
    private String linkedinUrl;
    /**
     * A Biograph for the User, like a short message.
     *
     * @since 0.2
     */
    private String bio;

    /**
     * A Builder that uses the Data Transfer Object and a User.
     *
     * @param user Main User from this Candidate.
     * @param dto  A Dataclass to Create the new User
     * @return This Candidate.
     */
    public static Candidate buildWithDTO(
            final User user, final CandidateDTO dto) {
        Candidate candidate = new Candidate();
        candidate.setId(user.getId());
        candidate.setFirstName(dto.getFirstName());
        candidate.setLastName(dto.getLastName());
        candidate.setLinkedinUrl(dto.getLinkedinURL());
        candidate.setBio(dto.getBio());
        return candidate;
    }
}
