package com.javagas.api.controllers;

import com.javagas.api.dto.*;
import com.javagas.api.exceptions.UserAlreadyExistsException;
import com.javagas.api.services.CandidateService;
import com.javagas.api.services.CompanyService;
import com.javagas.api.services.JWTGenerator;
import com.javagas.api.utils.Industry;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * A Controller to Authentication Needs, such Login or Delete Account.
 *
 * @version 0.2.4
 * @since 0.2
 */
@Tag(name = "Authentication",
        description = "Routes to Register Users and Login")
@Tag(name = "V1", description = "Version 1 of the API")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    /**
     * Used to Register new Company Users.
     *
     * @see com.javagas.api.models.Company
     * @since 0.2
     */
    private final CompanyService companyService;
    /**
     * Used to Register new Candidate Users.
     *
     * @see com.javagas.api.models.Candidate
     * @since 0.2
     */
    private final CandidateService candidateService;
    /**
     * A Service Used to generate a Login Token.
     *
     * @since 0.2
     */
    private final JWTGenerator jwtGenerator;
    /**
     * Used to Authenticate the User without Token.
     *
     * @since 0.2
     */
    private final AuthenticationManager manager;

    /**
     * Constructor to Inject the Dependencies.
     *
     * @param cos      A Service Used to Register Company Users.
     * @param cas      A Service Used to Register Candidate Users.
     * @param jwts     A Service Used to generate a Login Token.
     * @param authProv Used to Authenticate the User without Token.
     * @since 0.2
     */
    @Autowired
    public AuthController(
            final CompanyService cos,
            final CandidateService cas,
            final JWTGenerator jwts,
            final AuthenticationManager authProv
    ) {
        companyService = cos;
        candidateService = cas;
        jwtGenerator = jwts;
        manager = authProv;
    }

    /**
     * A Route to register new Candidates.
     *
     * @param candidate The request body with Candidate User Data.
     * @return OK
     * @since 0.2
     */
    @Operation(
            summary = "Register a new Candidate",
            description = "This route registers a new candidate in the system."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Candidate registered successfully"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - Invalid Candidate Data")
    })
    @PostMapping("candidate/register")
    public ResponseEntity<MessageResponse> registerCandidate(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Candidate User Data",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = CandidateDTO.class
                            )
                    )
            ) @Valid @RequestBody final CandidateDTO candidate
    ) throws UserAlreadyExistsException {
        candidateService.createCandidate(candidate);

        return new ResponseEntity<>(
                new MessageResponse("Candidate registered successfully!"),
                HttpStatus.OK);
    }

    /**
     * A Route to Register new Companies.
     *
     * @param company Request Body with Company User Data.
     * @return Bad Request (Industry Not Found) or Ok.
     * @since 0.2
     */
    @Operation(
            summary = "Register a new Company",
            description = "This route registers a new company in the system."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Company registered successfully"),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad Request - Industry Not Found or "
                            + "invalid Company Data")
    })
    @PostMapping("company/register")
    public ResponseEntity<MessageResponse> registerCompany(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Company User Data",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = CompanyDTO.class
                            )
                    )
            ) @Valid @RequestBody final CompanyDTO company
    ) throws UserAlreadyExistsException {
        if (!Industry.exists(company.getIndustry())) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse("Not Found Industry!"));
        }
        companyService.createCompany(company);

        return ResponseEntity.ok(
                new MessageResponse("Company registered successfully!"));
    }

    /**
     * Route used to Log in users and receive a Json Web Token.
     *
     * @param user DTO with Username and Password Fields.
     * @return A Success or Error message. Can throw UnAuthorized, or an
     * OK with token in Details.
     * @since 0.2
     */
    @Operation(
            summary = "Login User",
            description = "This route logs in a user and returns a JWT token."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User logged in successfully and return a "
                            + "JWT token"),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid Username or Password")
    })
    @PostMapping("login")
    public ResponseEntity<TokenResponse> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "User Login Data",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(
                                    implementation = LoginDTO.class
                            )
                    )
            ) @RequestBody final LoginDTO user) {
        Authentication authentication = manager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated()) {
            String token = jwtGenerator.generateToken(user.getUsername());
            return ResponseEntity.ok(new TokenResponse(token));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
