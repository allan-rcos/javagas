package com.javagas.api.integration;

import com.javagas.api.dto.*;
import com.javagas.api.models.User;
import com.javagas.api.repositories.CandidateRepo;
import com.javagas.api.repositories.CompanyRepo;
import com.javagas.api.repositories.UserRepo;
import com.javagas.api.services.JWTGenerator;
import com.javagas.api.utils.DTOFactory;
import com.javagas.api.utils.ModelFactory;
import com.javagas.api.utils.Role;
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

import java.util.Map;
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
    /**
     * A User to be used in the tests.
     *
     * @see com.javagas.api.models.User
     * @since 0.2
     */
    private final User user = ModelFactory.createUserCandidate();
    /**
     * A TestRestTemplate to be used in the tests to made requests.
     *
     * @since 0.2
     */
    @Autowired
    @Qualifier("guestClient")
    private TestRestTemplate guest;
    /**
     * User Repository to be used in the tests to access the database.
     * Create Users to allow tokens to be generated and validated.
     * Retrieve Users to check if they were created successfully.
     *
     * @since 0.2
     */
    @Autowired
    private UserRepo userRepo;
    /**
     * Company Repository to be used in the tests to access the database.
     * Retrieve Users to check if they were created successfully.
     *
     * @since 0.2
     */
    @Autowired
    private CompanyRepo companyRepo;
    /**
     * Candidate Repository to be used in the tests to access the database.
     * Retrieve Users to check if they were created successfully.
     *
     * @since 0.2
     */
    @Autowired
    private CandidateRepo candidateRepo;
    /**
     * A JWT Generator to be used in the tests to generate and validate tokens.
     * It is used to validate the token generated after a successful login.
     *
     * @since 0.2
     */
    @Autowired
    private JWTGenerator jwtGenerator;
    /**
     * A Password Encoder to be used in the tests to encode passwords.
     * It is used to encode the password of the user before saving it to
     * the database.
     *
     * @since 0.2
     */
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
                "/auth/candidate/register",
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
     * A Test to Register a Candidate User with Invalid Industry Data.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Candidate with Invalid Data will return "
            + "Bad Request")
    void registerCandidateWithInvalidDataReturnBadRequest() {
        CandidateDTO dto = DTOFactory.createCandidateUser();
        dto.setLinkedinURL(Optional.of("invalid-url"));
        dto.setPassword("1234");
        dto.setFirstName("");
        dto.setLastName("");
        var response = guest.postForEntity(
                "/auth/candidate/register",
                dto,
                Map.class
        );
        Map<String, String> body = response.getBody();
        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(
                HttpStatus.BAD_REQUEST, response.getStatusCode(),
                "Status code should be BAD_REQUEST");
        Assertions.assertNotNull(body,
                "Response body should not be null");
        Assertions.assertTrue(body.containsKey("linkedinURL"),
                "Response body should contain 'linkedinURL' key "
                        + "Because it is invalid");
        Assertions.assertTrue(body.containsKey("password"),
                "Response body should contain 'password' key "
                        + "Because it is invalid");
        Assertions.assertTrue(body.containsKey("firstName"),
                "Response body should contain 'firstName' key "
                        + "Because it is invalid");
        Assertions.assertTrue(body.containsKey("lastName"),
                "Response body should contain 'lastName' key "
                        + "Because it is invalid");
        Assertions.assertEquals(4, body.size(),
                "Response body should contain 4 keys");
        Optional<User> created =
                userRepo.findUserByUsername(dto.getUsername());
        Assertions.assertTrue(created.isEmpty(),
                "User should not be created in the database");
    }

    /**
     * A Test to Register a Candidate User that Already Exists.
     * <p>
     * This test will check if the method `registerCandidate` returns
     * a Conflict response when the user already exists in the database.
     * </p>
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Candidate that Already Exists (Username) will return"
            + " Conflict")
    void registerCandidateWithUsernameThatExistsWillReturnConflict() {
        userRepo.save(User.builder()
                .username(candidateDTO.getUsername())
                .password(passwordEncoder.encode(candidateDTO.getPassword()))
                .authorityRole(Role.CANDIDATE)
                .email("2" + candidateDTO.getEmail()) // Ensure unique email
                .build());
        var response = guest.postForEntity(
                "/auth/candidate/register",
                candidateDTO,
                MessageResponse.class
        );
        MessageResponse body = response.getBody();
        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(
                HttpStatus.CONFLICT, response.getStatusCode(),
                "Status code should be CONFLICT: " + body.toString());
        Assertions.assertNotNull(body,
                "Response body should not be null");
        Assertions.assertTrue(
                body.getMessage().toLowerCase().contains("username"),
                "Response body should contain 'username' key "
                        + "Because it is invalid");
        Assertions.assertFalse(userRepo.existsByEmail(candidateDTO.getEmail()),
                "User should not be created in the database");
    }

    /**
     * A Test to Register a Candidate User that Already Exists.
     * <p>
     * This test will check if the method `registerCandidate` returns
     * a Conflict response when the user already exists in the database.
     * </p>
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Candidate that Already Exists (Email) will return "
            + "Conflict")
    void registerCandidateWithEmailThatExistsWillReturnConflict() {
        userRepo.save(User.builder()
                .username("2" + candidateDTO.getUsername()) // Ensure unique
                .password(passwordEncoder.encode(candidateDTO.getPassword()))
                .authorityRole(Role.CANDIDATE)
                .email(candidateDTO.getEmail())
                .build());
        var response = guest.postForEntity(
                "/auth/candidate/register",
                candidateDTO,
                MessageResponse.class
        );
        MessageResponse body = response.getBody();
        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(
                HttpStatus.CONFLICT, response.getStatusCode(),
                "Status code should be CONFLICT: " + body.toString());
        Assertions.assertNotNull(body,
                "Response body should not be null");
        Assertions.assertTrue(
                body.getMessage().toLowerCase().contains("email"),
                "Response body should contain 'email' key "
                        + "Because it is invalid");
        Assertions.assertFalse(
                userRepo.existsByUsername(candidateDTO.getUsername()),
                "User should not be created in the database");
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
                "/auth/company/register",
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
                "/auth/company/register",
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
     * A Test to Register a Company User with Invalid Data.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Company with Invalid Data will return "
            + "Bad Request")
    void registerCompanyWithInvalidDataReturnBadRequest() {
        CompanyDTO dto = DTOFactory.createCompanyUser();
        dto.setWebsiteUrl(Optional.of("invalid-url"));
        dto.setPassword("1234");
        dto.setName("");
        var response = guest.postForEntity(
                "/auth/company/register",
                dto,
                Map.class
        );
        Map<String, String> body = response.getBody();
        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(
                HttpStatus.BAD_REQUEST, response.getStatusCode(),
                "Status code should be BAD_REQUEST: " + body.toString());
        Assertions.assertNotNull(body,
                "Response body should not be null");
        Assertions.assertTrue(body.containsKey("websiteUrl"),
                "Response body should contain 'websiteUrl' key "
                        + "Because it is invalid");
        Assertions.assertTrue(body.containsKey("password"),
                "Response body should contain 'password' key "
                        + "Because it is invalid");
        Assertions.assertTrue(body.containsKey("name"),
                "Response body should contain 'name' key "
                        + "Because it is invalid");
        Assertions.assertEquals(3, body.size(),
                "Response body should contain 3 keys");
        Optional<User> created =
                userRepo.findUserByUsername(dto.getUsername());
        Assertions.assertTrue(created.isEmpty(),
                "User should not be created in the database");
    }

    /**
     * A Test to Register a Company User that Already Exists.
     * <p>
     * This test will check if the method `registerCompany` returns
     * a Conflict response when the user already exists in the database.
     * </p>
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Company that Already Exists (Username) will return "
            + "Conflict")
    void registerCompanyWithUsernameThatExistsWillReturnConflict() {
        userRepo.save(User.builder()
                .username(companyDTO.getUsername())
                .password(passwordEncoder.encode(companyDTO.getPassword()))
                .authorityRole(Role.CANDIDATE)
                .email("2" + companyDTO.getEmail()) // Ensure unique email
                .build());
        var response = guest.postForEntity(
                "/auth/company/register",
                companyDTO,
                MessageResponse.class
        );
        MessageResponse body = response.getBody();
        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(
                HttpStatus.CONFLICT, response.getStatusCode(),
                "Status code should be CONFLICT: " + body.toString());
        Assertions.assertNotNull(body,
                "Response body should not be null");
        Assertions.assertTrue(
                body.getMessage().toLowerCase().contains("username"),
                "Response body should contain 'username' key "
                        + "Because it is invalid");
        Assertions.assertFalse(userRepo.existsByEmail(companyDTO.getEmail()),
                "User should not be created in the database");
    }

    /**
     * A Test to Register a Company User that Already Exists.
     * <p>
     * This test will check if the method `registerCompany` returns
     * a Conflict response when the user already exists in the database.
     * </p>
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Company that Already Exists (Email) will return "
            + "Conflict")
    void registerCompanyWithEmailThatExistsWillReturnConflict() {
        userRepo.save(User.builder()
                .username("2" + companyDTO.getUsername()) // Ensure unique user
                .password(passwordEncoder.encode(companyDTO.getPassword()))
                .authorityRole(Role.CANDIDATE)
                .email(companyDTO.getEmail())
                .build());
        var response = guest.postForEntity(
                "/auth/company/register",
                companyDTO,
                MessageResponse.class
        );
        MessageResponse body = response.getBody();
        Assertions.assertNotNull(response,
                "Response should not be null");
        Assertions.assertEquals(
                HttpStatus.CONFLICT, response.getStatusCode(),
                "Status code should be CONFLICT: " + body.toString());
        Assertions.assertNotNull(body,
                "Response body should not be null");
        Assertions.assertTrue(
                body.getMessage().toLowerCase().contains("email"),
                "Response body should contain 'email' key "
                        + "Because it is invalid");
        Assertions.assertFalse(
                userRepo.existsByUsername(companyDTO.getUsername()),
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
                "/auth/login",
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
                "/auth/login",
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
                    .rootUri("http://localhost:" + port + "/api/v1");
            return new TestRestTemplate(restTemplateBuilder);
        }
    }
}
