package com.javagas.api.models;

import com.javagas.api.dto.CompanyDTO;
import com.javagas.api.utils.Industry;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A Company User.
 * <p>
 * this entity inherits the User Class and complement with Company Only
 * Fields. Have a {@link com.javagas.api.utils.CompanyAuthority
 * Company Authority} And can:
 * </p>
 * <ul>
 *     <li>Create new jobs;</li>
 *     <li>Create new Skills;</li>
 *     <li>See Jobs Applications when the owner.</li>
 * </ul>
 *
 * @see User Main User Class.
 * @see Candidate Candidate Only Fields.
 * @since 0.2
 */
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    /**
     * A Join ID Table that will referer to the Main User class.
     *
     * @since 0.2
     */
    @Id
    private Long id;
    /**
     * Company full-qualified name.
     *
     * @since 0.2
     */
    private String name;
    /**
     * A Short Business Description.
     *
     * @since 0.2
     */
    private String description;
    /**
     * A URL to the Company Website. Can be social account or company cards.
     *
     * @since 0.2
     */
    private String websiteUrl;
    /**
     * The Company Industry. TI, Health, Layer, etc...
     *
     * @since 0.2
     */
    @Enumerated(EnumType.ORDINAL)
    private Industry industry;

    /**
     * A Builder that uses the Data Transfer Object and a User.
     *
     * @param user Main User from this Candidate.
     * @param dto  A Dataclass to Create the new User
     * @return This Candidate.
     */
    public static Company buildWithDTO(
            final User user, final CompanyDTO dto) {
        Company company = new Company();
        company.setId(user.getId());
        company.setName(dto.getName());
        company.setDescription(dto.getDescription());
        company.setWebsiteUrl(dto.getWebsiteUrl());
        company.setIndustry(Industry.valueOf(dto.getIndustry()));
        return company;
    }
}
