package com.javagas.api.utils;

import com.javagas.api.dto.CandidateDTO;
import com.javagas.api.dto.CompanyDTO;
import com.javagas.api.dto.LoginDTO;
import lombok.experimental.UtilityClass;

import java.util.Optional;

/**
 * A Factory to create Data Transfer Objects (DTOs) for testing purposes.
 * <p>
 * This class provides methods to create DTOs with predefined values for testing
 * the application without needing to manually set each field.
 * </p>
 *
 * @since 0.2
 */
@UtilityClass
public final class DTOFactory {
    /**
     * Create a UserDTO for a Company User.
     *
     * @return A UserDTO with the Company User details.
     */
    public static CompanyDTO createCompanyUser() {
        CompanyDTO dto = new CompanyDTO();
        dto.setUsername(TestConstants.COMPANY_USERNAME);
        dto.setPassword(TestConstants.PASSWORD);
        dto.setEmail(TestConstants.COMPANY_EMAIL);
        dto.setName(TestConstants.COMPANY_NAME);
        dto.setDescription(TestConstants.COMPANY_DESCRIPTION);
        dto.setWebsiteUrl(Optional.of(TestConstants.COMPANY_WEBSITE_URL));
        dto.setIndustry(TestConstants.COMPANY_INDUSTRY);
        return dto;
    }

    /**
     * Create a UserDTO for a Candidate User.
     *
     * @return A UserDTO with the Candidate User details.
     */
    public static CandidateDTO createCandidateUser() {
        CandidateDTO dto = new CandidateDTO();
        dto.setUsername(TestConstants.CANDIDATE_USERNAME);
        dto.setPassword(TestConstants.PASSWORD);
        dto.setEmail(TestConstants.CANDIDATE_EMAIL);
        dto.setFirstName(TestConstants.CANDIDATE_FIRST_NAME);
        dto.setLastName(TestConstants.CANDIDATE_LAST_NAME);
        dto.setLinkedinURL(Optional.of(TestConstants.CANDIDATE_LINKEDIN_URL));
        dto.setBio(TestConstants.CANDIDATE_BIO);
        return dto;
    }

    /**
     * Create a LoginDTO for authentication.
     *
     * @return A LoginDTO with the username and encrypted password.
     * @since 0.2
     */
    public static LoginDTO createLogin() {
        LoginDTO dto = new LoginDTO();
        dto.setUsername(TestConstants.CANDIDATE_USERNAME);
        dto.setPassword(TestConstants.PASSWORD);
        return dto;
    }

    public static CompanyDTO createInvalidCompanyUser() {
        CompanyDTO dto = new CompanyDTO();
        dto.setUsername(TestConstants.COMPANY_USERNAME);
        dto.setPassword(TestConstants.PASSWORD);
        dto.setEmail(TestConstants.COMPANY_EMAIL);
        dto.setName(TestConstants.COMPANY_NAME);
        dto.setDescription(TestConstants.COMPANY_DESCRIPTION);
        dto.setWebsiteUrl(Optional.of(TestConstants.COMPANY_WEBSITE_URL));
        dto.setIndustry(TestConstants.COMPANY_INDUSTRY);
        return dto;
    }
}
