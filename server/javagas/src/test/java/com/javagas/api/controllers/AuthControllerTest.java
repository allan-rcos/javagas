package com.javagas.api.controllers;

import com.javagas.api.dto.CandidateDTO;
import com.javagas.api.dto.CompanyDTO;
import com.javagas.api.dto.LoginDTO;
import com.javagas.api.security.JWTGenerator;
import com.javagas.api.services.CandidateService;
import com.javagas.api.services.CompanyService;
import com.javagas.api.utils.AuthFactory;
import com.javagas.api.utils.DTOFactory;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
class AuthControllerTest {
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
     * A Valid Token to be used in Tests.
     *
     * @since 0.2
     */
    private final String token = AuthFactory.generateValidCandidateToken();
    /**
     * A Mocked Service to Register Company Users.
     *
     * @see com.javagas.api.services.CompanyService
     * @since 0.2
     */
    @Mock
    private CompanyService companyService;
    /**
     * A Mocked Service to Register Candidate Users.
     *
     * @see com.javagas.api.services.CandidateService
     * @since 0.2
     */
    @Mock
    private CandidateService candidateService;
    /**
     * A Mocked Service to Generate a Login Token.
     *
     * @since 0.2
     */
    @Mock
    private JWTGenerator jwtGenerator;
    /**
     * A Mocked Authentication Manager to Authenticate Users.
     *
     * @since 0.2
     */
    @Mock
    private AuthenticationManager manager;
    /**
     * A Mocked Authentication Object to Represent the User.
     *
     * @since 0.2
     */
    @Mock
    private Authentication authentication;
    /**
     * The Controller to be Tested.
     *
     * @see com.javagas.api.controllers.AuthController
     * @since 0.2
     */
    @InjectMocks
    private AuthController authController;

    /**
     * Setup Method to Initialize Mocks and Stubs.
     *
     * @since 0.2
     */
    @BeforeEach
    void setUp() {
        BDDMockito.when(authentication.isAuthenticated()).thenReturn(true);
        BDDMockito.when(manager.authenticate(BDDMockito.any()))
                .thenReturn(authentication);
    }

    /**
     * A Test to Register a Candidate User Successfully.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Candidate Will Return Ok Response Successfully")
    void registerCandidateWillReturnOkResponseSuccessfully() {
        var response = authController.registerCandidate(candidateDTO);
        Assertions.assertThat(response)
                .isNotNull();
        Assertions.assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        Assertions.assertThat(response.getBody())
                .isNotNull();
    }

    /**
     * A Test to Register a Company User Successfully.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Register Company Will Return Ok Response Successfully")
    void registerCompanyWillReturnOkResponseSuccessfully() {
        var response = authController.registerCompany(companyDTO);
        Assertions.assertThat(response)
                .isNotNull();
        Assertions.assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        Assertions.assertThat(response.getBody())
                .isNotNull();
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
        var response = authController.registerCompany(dto);
        Assertions.assertThat(response)
                .isNotNull();
        Assertions.assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.BAD_REQUEST);
        Assertions.assertThat(response.getBody())
                .isNotNull();
    }

    /**
     * A Test to Login a User Successfully.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Login a User will return Ok Response Successfully")
    void loginAuthenticateAndReturnSuccessfully() {
        BDDMockito.when(jwtGenerator.generateToken(BDDMockito.anyString()))
                .thenReturn(token);
        var response = authController.login(loginDTO);
        Assertions.assertThat(response)
                .isNotNull();
        Assertions.assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        Assertions.assertThat(response.getBody())
                .isNotNull();
        Assertions.assertThat(response.getBody().getToken())
                .isEqualTo(token);
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
        BDDMockito.when(authentication.isAuthenticated()).thenReturn(false);

        var response = authController.login(loginDTO);

        Assertions.assertThat(response)
                .isNotNull();
        Assertions.assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.UNAUTHORIZED);
    }
}
