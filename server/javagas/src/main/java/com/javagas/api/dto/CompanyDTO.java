package com.javagas.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.validator.constraints.URL;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * The Company Data Transfer Object.
 *
 * @see com.javagas.api.models.Company
 * @since 0.2
 */
@Component
@Getter
@Setter
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDTO extends UserDTO {
    /**
     * Company full-qualified name.
     *
     * @see com.javagas.api.models.Company
     * @since 0.2
     */
    @NotBlank
    private String name;
    /**
     * Company business description.
     *
     * @see com.javagas.api.models.Company
     * @since 0.2
     */
    private String description;
    /**
     * A Url to Any Company Website, Social Account or Business Card.
     *
     * @see com.javagas.api.models.Company
     * @since 0.2
     */
    private Optional<@URL String> websiteUrl = Optional.empty();
    /**
     * The User Industry such an Enum Name.
     *
     * @see com.javagas.api.models.Company
     * @see com.javagas.api.utils.Industry IndustryEnum
     * @since 0.2
     */
    @NotBlank
    private String industry;
}
