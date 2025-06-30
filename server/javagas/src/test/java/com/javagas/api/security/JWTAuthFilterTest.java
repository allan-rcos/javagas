package com.javagas.api.security;

import com.javagas.api.models.User;
import com.javagas.api.utils.AuthFactory;
import com.javagas.api.utils.ModelFactory;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.security.auth.login.CredentialException;

/**
 * Test to validate the JWTAuthFilter functionality.
 *
 * @version 0.2
 * @since 0.2
 */
@ExtendWith(SpringExtension.class)
class JWTAuthFilterTest {

    /**
     * The User that will be used to test the filter.
     * It is a valid user with a valid token.
     *
     * @see ModelFactory
     * @since 0.2
     */
    private final User validUser = ModelFactory
            .createUserCandidate();
    /**
     * The valid token that will be used to test the filter.
     * It is generated from the valid user.
     *
     * @see JWTGenerator
     * @since 0.2
     */
    private final String validToken = AuthFactory
            .generateValidCandidateToken();
    /**
     * The SecurityUser that will be used to test the filter.
     * It is a wrapper around the valid user.
     *
     * @since 0.2
     */
    private final SecurityUser securityUser = AuthFactory
            .createCandidateUser();
    /**
     * A Filter Component that will validate Bearer Tokens in Whole Application.
     *
     * @since 0.2
     */
    @InjectMocks
    private JWTAuthFilter jwtAuthFilter;
    /**
     * A Service that returns a UserDetails if user exists.
     *
     * @since 0.2
     */
    @Mock
    private UserDetailsService userDetailsService;
    /**
     * A Service to Validate and Generate Tokens.
     * It is used to generate and validate JWT tokens.
     *
     * @see JWTGenerator
     * @since 0.2
     */
    @Mock
    private JWTGenerator jwtGenerator;
    /**
     * The HttpServletRequest that will be used to test the filter.
     * It is mocked to return the Authorization header.
     *
     * @since 0.2
     */
    @MockitoBean
    private HttpServletRequest request;
    /**
     * The HttpServletResponse that will be used to test the filter.
     * It is mocked to return the response.
     *
     * @since 0.2
     */
    @MockitoBean
    private HttpServletResponse response;
    /**
     * The FilterChain that will be used to test the filter.
     * It is mocked to allow the filter to continue the chain.
     *
     * @since 0.2
     */
    @MockitoBean
    private FilterChain filterChain;

    /**
     * Set up the test environment before each test.
     * It clears the SecurityContext and sets up the mocks for the JWTGenerator
     * and UserDetailsService.
     *
     * @since 0.2
     */
    @BeforeEach
    void setUp() throws CredentialException {
        SecurityContextHolder.clearContext();
        // Method Chains exception is valid, but IntalliJ show a warning.
        BDDMockito.doThrow(new CredentialException())
                .when(jwtGenerator)
                .validateToken(
                        AdditionalMatchers.not(
                                ArgumentMatchers.eq(validToken)));
        BDDMockito.given(jwtGenerator.getUsernameFromJWT(
                        BDDMockito.eq(validToken)))
                .willReturn(validUser.getUsername());
        BDDMockito.given(userDetailsService.loadUserByUsername(
                        BDDMockito.eq(validUser.getUsername())))
                .willReturn(securityUser);
    }

    /**
     * Test to validate the JWTAuthFilter functionality.
     * It tests the doFilterInternal method of the JWTAuthFilter class.
     * It checks if the filter can authorize the user with a valid token,
     * and if it cannot authorize the user with an invalid token or no token.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("doFilterInternal without Bearer Authorization Header"
            + "can't authorize the user")
    void doFilterInternalWithoutAuthorizationHeaderCanNotAuthorize()
            throws CredentialException {
        BDDMockito.given(request.getHeader(BDDMockito.eq("Authorization")))
                .willReturn("");
        Assertions.assertDoesNotThrow(
                () -> jwtAuthFilter
                        .doFilterInternal(request, response, filterChain),
                "The filter should not throw exceptions here");

        Assertions.assertNull(
                SecurityContextHolder.getContext().getAuthentication(),
                "The Security Context should not have any authentication set");
        // The JWTGenerator should not validate any token when header is empty
        BDDMockito.verify(jwtGenerator, BDDMockito.never())
                .validateToken(BDDMockito.anyString());
    }

    /**
     * Test to validate the JWTAuthFilter functionality.
     * It tests the doFilterInternal method of the JWTAuthFilter class.
     * It checks if the filter can authorize the user with a valid token,
     * and if it cannot authorize the user with an invalid token or no token.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("doFilterInternal with Invalid Authorization Header"
            + "can authorize the user")
    void doFilterInternalWithInvalidAuthorizationHeaderCanAuthorize()
            throws CredentialException {
        BDDMockito.given(request.getHeader("Authorization"))
                .willReturn("Bearer InvalidToken");

        Assertions.assertDoesNotThrow(
                () -> jwtAuthFilter
                        .doFilterInternal(request, response, filterChain),
                "The filter should not throw exceptions here");

        Assertions.assertNull(
                SecurityContextHolder.getContext().getAuthentication(),
                "The Security Context should not have any authentication set");
        // The JWTGenerator should validate and throw an exception
        BDDMockito.verify(jwtGenerator, BDDMockito.times(1))
                .validateToken(BDDMockito.anyString());
    }

    /**
     * Test to validate the JWTAuthFilter functionality.
     * It tests the doFilterInternal method of the JWTAuthFilter class.
     * It checks if the filter can authorize the user with a valid token,
     * and if it cannot authorize the user with an invalid token or no token.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("doFilterInternal with Valid Authorization Header"
            + "can authorize the user")
    void doFilterInternalWithValidAuthorizationHeaderCanAuthorize()
            throws CredentialException {
        BDDMockito.given(request.getHeader("Authorization"))
                .willReturn("Bearer " + validToken);

        Assertions.assertDoesNotThrow(
                () -> jwtAuthFilter
                        .doFilterInternal(request, response, filterChain),
                "The filter should not throw exceptions here");

        Assertions.assertNotNull(
                SecurityContextHolder.getContext().getAuthentication(),
                "The Security Context should have an authentication set");
        // The JWTGenerator should validate the token
        BDDMockito.verify(jwtGenerator, BDDMockito.times(1))
                .validateToken(BDDMockito.anyString());
    }
}
