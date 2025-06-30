package com.javagas.api.integration;

import com.javagas.api.dto.*;
import com.javagas.api.models.User;
import com.javagas.api.repositories.CandidateRepo;
import com.javagas.api.repositories.CompanyRepo;
import com.javagas.api.repositories.UserRepo;
import com.javagas.api.security.JWTGenerator;
import com.javagas.api.utils.DTOFactory;
import com.javagas.api.utils.ModelFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;

import java.util.Optional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class AuthIT {
    /**
     * A DTO to Represent a Company User.
     *
     * @see com.javagas.api.models.Company
     * @since 0.2
     */
    private final CompanyDTO companyDTO = DTOFactory.createCompanyUser();
    /**
     * A DTO to Represent a Candidate User.
     *
     * @see com.javagas.api.models.Candidate
     * @since 0.2
     */
    private final CandidateDTO candidateDTO = DTOFactory.createCandidateUser();
    /**
     * A DTO to Represent a Login Request.
     *
     * @see com.javagas.api.controllers.AuthController#login
     * @since 0.2
     */
    private final LoginDTO loginDTO = DTOFactory.createLogin();
    private final User user = ModelFactory.createUserCandidate();
    @Autowired
    @Qualifier("guestClient")
    private TestRestTemplate guest;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CompanyRepo companyRepo;
    @Autowired
    private CandidateRepo candidateRepo;
    @Autowired
    private JWTGenerator jwtGenerator;
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * A Test to Register a Candidate User Successfully.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Candidate Will Return Ok Response Successfully")
    void registerCandidateWillReturnOkResponseSuccessfully() {
        var response = guest.exchange(
                "/api/auth/candidate/register",
                HttpMethod.POST,
                new HttpEntity<>(candidateDTO),
                Object.class
        );

        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertTrue(response.hasBody(),
                "Response should have a body");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(),
                "Status code should be OK");
        User created = userRepo.findUserByUsername(candidateDTO.getUsername())
                .orElseThrow(() ->
                        new AssertionError(
                                "User not found in the database"));
        candidateRepo.findById(created.getId())
                .orElseThrow(() ->
                        new AssertionError(
                                "Candidate not found in the database"));
    }

    /**
     * A Test to Register a Company User Successfully.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Company Will Return Ok Response Successfully")
    void registerCompanyWillReturnOkResponseSuccessfully() {
        var response = guest.postForEntity(
                "/api/auth/company/register",
                companyDTO,
                MessageResponse.class
        );

        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(),
                "Status code should be OK");
        Assertions.assertNotNull(response.getBody(),
                "Response body should not be null");
        User created = userRepo.findUserByUsername(companyDTO.getUsername())
                .orElseThrow(() ->
                        new AssertionError(
                                "User not found in the database"));
        companyRepo.findById(created.getId())
                .orElseThrow(() ->
                        new AssertionError(
                                "Company not found in the database"));
    }

    /**
     * A Test to Register a Company User with Invalid Industry Data.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Company with Invalid Industry Will Return"
            + "Bad Request")
    void registerCompanyWithInvalidIndustryWillReturnBadRequest() {
        CompanyDTO dto = DTOFactory.createCompanyUser();
        String invalidIndustry = "Software Development";
        dto.setIndustry(invalidIndustry);
        var response = guest.postForEntity(
                "/api/auth/company/register",
                dto,
                MessageResponse.class
        );
        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(
                HttpStatus.BAD_REQUEST, response.getStatusCode(),
                "Status code should be BAD_REQUEST");
        Assertions.assertNotNull(response.getBody(),
                "Response body should not be null");
        Optional<User> created =
                userRepo.findUserByUsername(dto.getUsername());
        Assertions.assertTrue(created.isEmpty(),
                "User should not be created in the database");
    }

    /**
     * A Test to Log in a User Successfully.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Login a User will return Ok Response Successfully")
    void loginAuthenticateAndReturnSuccessfully() {
        userRepo.save(user);
        var response = guest.postForEntity(
                "/api/auth/login",
                loginDTO,
                TokenResponse.class
        );
        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(HttpStatus.OK, response.getStatusCode(),
                "Status code should be OK");
        Assertions.assertNotNull(response.getBody(),
                "Response body should not be null");
        Assertions.assertNotNull(response.getBody().getToken(),
                "Token in response body should not be null");
        Assertions.assertDoesNotThrow(
                () -> jwtGenerator.validateToken(response.getBody().getToken()),
                "Generated token is invalid.");
    }

    /**
     * A Test to Log in a User with Invalid Credentials.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Login a User with Invalid Credentials will return"
            + "Unauthorized Response")
    void loginNotAuthenticateAndReturnUnAuthorized() {
        var response = guest.postForEntity(
                "/api/auth/login",
                loginDTO,
                TokenResponse.class
        );

        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(
                HttpStatus.UNAUTHORIZED, response.getStatusCode(),
                "Status code should be UNAUTHORIZED");
    }

    @TestConfiguration
    @Lazy
    static class Config {
        @Bean(name = "guestClient")
        public TestRestTemplate testRestTemplateGuest(
                @Value("${local.server.port}") final int port) {
            RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder()
                    .rootUri("http://localhost:" + port);
            return new TestRestTemplate(restTemplateBuilder);
        }
    }
}
