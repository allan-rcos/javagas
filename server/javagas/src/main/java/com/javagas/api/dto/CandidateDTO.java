package com.javagas.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.URL;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * The Candidate Data Transfer Object.
 *
 * @see com.javagas.api.models.Candidate
 * @since 0.2
 */
@Component
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDTO extends UserDTO {
    /**
     * Candidate first name.
     *
     * @see com.javagas.api.models.Candidate
     * @since 0.2
     */
    @NotBlank
    private String firstName;
    /**
     * Candidate last name.
     *
     * @see com.javagas.api.models.Candidate
     * @since 0.2
     */
    @NotBlank
    private String lastName;
    /**
     * A Url to Candidate LinkedIn Account.
     *
     * @see com.javagas.api.models.Candidate
     * @since 0.2
     */
    private Optional<@URL String> linkedinURL = Optional.empty();
    /**
     * A Biograph for the Candidate.
     *
     * @see com.javagas.api.models.Candidate
     * @since 0.2
     */
    private String bio;
}
