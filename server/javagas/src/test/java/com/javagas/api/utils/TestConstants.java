package com.javagas.api.utils;

import com.javagas.api.models.SecurityUser;
import com.javagas.api.services.SecurityUserService;
import lombok.experimental.UtilityClass;

/**
 * A Utility Class that contains constants used in tests.
 * <p>
 * This class provides a set of constants that are used across various test
 * cases to ensure consistency and avoid duplication of hard-coded values.
 * </p>
 *
 * @since 0.2
 */
@UtilityClass
public class TestConstants {
    /**
     * The username for the test company user.
     *
     * @see com.javagas.api.models.User User Model
     * @see com.javagas.api.dto.LoginDTO User Login DTO
     * @since 0.2
     */
    public static final String COMPANY_USERNAME =
            "testCompanyUser";
    /**
     * The email for the test company user.
     *
     * @see com.javagas.api.models.User User Model
     * @see com.javagas.api.dto.UserDTO User Model DTO
     * @since 0.2
     */
    public static final String COMPANY_EMAIL =
            "company@test.dev";
    /**
     * The first name of the test company user.
     *
     * @see com.javagas.api.models.Company Company Model
     * @see com.javagas.api.dto.CompanyDTO Company DTO
     * @since 0.2
     */
    public static final String COMPANY_NAME =
            "Test Company";
    /**
     * The description of the test company.
     *
     * @see com.javagas.api.models.Company Company Model
     * @see com.javagas.api.dto.CompanyDTO Company DTO
     * @since 0.2
     */
    public static final String COMPANY_DESCRIPTION =
            "A Short Description of the Test Company";
    /**
     * The website URL of the test company.
     *
     * @see com.javagas.api.models.Company Company Model
     * @see com.javagas.api.dto.CompanyDTO Company DTO
     * @since 0.2
     */
    public static final String COMPANY_WEBSITE_URL =
            "https://allan-rcos.github.io";
    /**
     * The industry of the test company.
     *
     * @see com.javagas.api.utils.Industry Industry Enum
     * @see com.javagas.api.models.Company Company Model
     * @see com.javagas.api.dto.CompanyDTO Company DTO
     * @since 0.2
     */
    public static final String COMPANY_INDUSTRY =
            Industry.TECHNOLOGY.name();
    /**
     * The username for the test candidate user.
     *
     * @see com.javagas.api.models.User User Model
     * @see com.javagas.api.dto.LoginDTO User Login DTO
     * @since 0.2
     */
    public static final String CANDIDATE_USERNAME =
            "testCandidateUser";
    /**
     * The email for the test candidate user.
     *
     * @see com.javagas.api.models.User User Model
     * @see com.javagas.api.dto.UserDTO User Model DTO
     * @since 0.2
     */
    public static final String CANDIDATE_EMAIL =
            "candidate@test.dev";
    /**
     * The first name of the test candidate user.
     *
     * @see com.javagas.api.models.Candidate Candidate Model
     * @see com.javagas.api.dto.CandidateDTO Candidate DTO
     * @since 0.2
     */
    public static final String CANDIDATE_FIRST_NAME =
            "Test";
    /**
     * The last name of the test candidate user.
     *
     * @see com.javagas.api.models.Candidate Candidate Model
     * @see com.javagas.api.dto.CandidateDTO Candidate DTO
     * @since 0.2
     */
    public static final String CANDIDATE_LAST_NAME =
            "Candidate";
    /**
     * A LinkedIn URL for the test candidate user.
     *
     * @see com.javagas.api.models.Candidate Candidate Model
     * @see com.javagas.api.dto.CandidateDTO Candidate DTO
     * @since 0.2
     */
    public static final String CANDIDATE_LINKEDIN_URL =
            "https://www.linkedin.com/in/ricardo-allan";
    /**
     * A short bio for the test candidate user.
     *
     * @see com.javagas.api.models.Candidate Candidate Model
     * @see com.javagas.api.dto.CandidateDTO Candidate DTO
     * @since 0.2
     */
    public static final String CANDIDATE_BIO =
            "A Short Bio of the Test Candidate";
    /**
     * The password for the test user.
     *
     * @see com.javagas.api.models.User User Model
     * @see com.javagas.api.dto.LoginDTO User Login DTO
     * @since 0.2
     */
    public static final String PASSWORD =
            "T3$tT3$t";
    /**
     * The encrypted password for the test user.
     *
     * @see SecurityUser Security User Model
     * @see SecurityUserService Security User Service
     * @since 0.2
     */
    public static final String ENCRYPTED_PASSWORD =
            "$2a$10$BKrEWCVhDaKEYQTxXfhhuu5tgMGmOWmPkWFy8s0uZQbzsS5yFkqee";
}
