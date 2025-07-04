package com.javagas.api.services;

import com.javagas.api.models.User;
import com.javagas.api.utils.ModelFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.security.auth.login.CredentialException;

/**
 * Test class for JWTGenerator.
 *
 * @version 0.2
 * @since 0.2
 */
@ExtendWith(SpringExtension.class)
class JWTGeneratorTest {
    /**
     * The JWTGenerator instance to be tested.
     *
     * @since 0.2
     */
    private final JWTGenerator generator = new JWTGenerator();

    /**
     * Test if username extracted from JWT is correct.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("getUsernameFromJWT Username is extracted from JWT correctly.")
    void getUsernameFromJWTSuccess() {
        User user = ModelFactory.createUserCandidate();
        String token = generator.generateToken(user.getUsername());
        String username = generator.getUsernameFromJWT(token);

        Assertions.assertEquals(
                user.getUsername(),
                username,
                "The username extracted from the JWT should match"
                        + "the original username.");
    }

    /**
     * Test if validateToken does not throw CredentialException for valid token.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("validateToken should not throw an exception for a"
            + "valid token.")
    void validateToken() {
        User user = ModelFactory.createUserCandidate();
        String token = generator.generateToken(user.getUsername());
        Assertions.assertDoesNotThrow(
                () -> generator.validateToken(token),
                "The token should be valid and not throw an exception.");
    }

    /**
     * Test if validateToken throws CredentialException for invalid token.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("validateToken throws CredentialException for invalid token.")
    void validateTokenWithInvalidToken() {
        User user = ModelFactory.createUserCandidate();
        String invalidToken = "invalid"
                + generator.generateToken(user.getUsername());
        Assertions.assertThrows(
                CredentialException.class,
                () -> generator.validateToken(invalidToken),
                "The token should be invalid and throw a CredentialException.");
    }
}
