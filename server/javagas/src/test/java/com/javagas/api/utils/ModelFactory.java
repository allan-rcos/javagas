package com.javagas.api.utils;

import com.javagas.api.models.Candidate;
import com.javagas.api.models.Company;
import com.javagas.api.models.User;

/**
 * This class is a factory for creating User objects for testing purposes.
 * It can be used to generate test data for the User model.
 *
 * @version 0.2
 * @since 0.2
 */
public final class ModelFactory {

    /**
     * Private constructor to prevent instantiation of this utility class.
     * This class should not be instantiated, as it only provides
     * static methods.
     *
     * @throws IllegalArgumentException If the constructor is called.
     * @since 0.2
     */
    private ModelFactory() throws IllegalArgumentException {
        // Private constructor to prevent instantiation
        throw new IllegalStateException("Utility class");
    }

    /**
     * Creates a User object with default values.
     * The username is "testuser", the password is "testpassword",
     * and the email is "test@test.dev".
     *
     * @return A User object with default values.
     * @since 0.2
     */
    public static User createUserCandidate() {
        return ModelFactory.createUser(
                TestConstants.CANDIDATE_USERNAME,
                TestConstants.ENCRYPTED_PASSWORD,
                TestConstants.CANDIDATE_EMAIL,
                Role.CANDIDATE
        );
    }

    /**
     * Creates a User object with default values.
     * The username is "testuser", the password is "testpassword",
     * and the email is "test@test.dev".
     *
     * @return A User object with default values.
     * @since 0.2
     */
    public static User createUserCompany() {
        return ModelFactory.createUser(
                TestConstants.COMPANY_USERNAME,
                TestConstants.ENCRYPTED_PASSWORD,
                TestConstants.COMPANY_EMAIL,
                Role.COMPANY
        );
    }

    /**
     * Creates a Company object with predefined values.
     *
     * @return A Company object with predefined values.
     * @see TestConstants for the values used.
     * @since 0.2
     */
    public static Company createCompanyUser() {
        return Company.builder()
                .name(TestConstants.COMPANY_NAME)
                .description(TestConstants.COMPANY_DESCRIPTION)
                .websiteUrl(TestConstants.COMPANY_WEBSITE_URL)
                .industry(Industry.valueOf(TestConstants.COMPANY_INDUSTRY))
                .build();
    }

    /**
     * Creates a com.javagas.api.models.Candidate object with predefined values.
     *
     * @return A com.javagas.api.models.Candidate object with predefined values.
     * @see TestConstants for the values used.
     * @since 0.2
     */
    public static Candidate createCandidateUser() {
        return Candidate.builder()
                .firstName(TestConstants.CANDIDATE_FIRST_NAME)
                .lastName(TestConstants.CANDIDATE_LAST_NAME)
                .linkedinUrl(TestConstants.CANDIDATE_LINKEDIN_URL)
                .bio(TestConstants.CANDIDATE_BIO)
                .build();
    }

    /**
     * Creates a User object with the given username and password.
     *
     * @param username The username of the user.
     * @param password The password of the user.
     * @param email    The email of the user.
     * @param role     The role of the user.
     * @return A User object with the specified username and password.
     * @since 0.2
     */
    public static User createUser(
            final String username,
            final String password,
            final String email,
            final Role role
    ) {
        return User.builder()
                .username(username)
                .password(password)
                .email(email)
                .authorityRole(role)
                .build();
    }
}
