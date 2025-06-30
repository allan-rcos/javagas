package com.javagas.api.utils;

import com.javagas.api.security.JWTGenerator;
import com.javagas.api.security.SecurityUser;
import lombok.experimental.UtilityClass;

/**
 * A Factory to Generate Valid Tokens for Testing Purposes.
 * It is used to generate a valid token for a candidate user.
 *
 * @version 0.2
 * @since 0.2
 */
@UtilityClass
public class AuthFactory {
    /**
     * Generates a valid token for a candidate user.
     * This token is used to authenticate the candidate user in tests.
     *
     * @return A valid JWT token for the candidate user.
     * @since 0.2
     */
    public static String generateValidCandidateToken() {
        return (new JWTGenerator())
                .generateToken(TestConstants.CANDIDATE_USERNAME);
    }

    /**
     * Generates a SecurityUser object for a candidate user.
     * This user is used to test the security features of the application.
     *
     * @return A SecurityUser object for the candidate user.
     * @since 0.2
     */
    public static SecurityUser createCandidateUser() {
        return new SecurityUser(ModelFactory.createUserCandidate());
    }
}
