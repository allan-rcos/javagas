package com.javagas.api.services;

import com.javagas.api.dto.CandidateDTO;
import com.javagas.api.dto.UserDTO;
import com.javagas.api.exceptions.UserAlreadyExistsException;
import com.javagas.api.models.Candidate;
import com.javagas.api.models.User;
import com.javagas.api.repositories.CandidateRepo;
import com.javagas.api.utils.DTOFactory;
import com.javagas.api.utils.ModelFactory;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

/**
 * A Service for Candidate Users.
 * <p>
 * This class contains tests for the CandidateService.
 * </p>
 *
 * @version 0.2
 * @see UserService Main utility class.
 * @since 0.2
 */
@ExtendWith(SpringExtension.class)
class CandidateServiceTest {

    /**
     * The method argument DTO.
     * <p>
     * This is used to test the creation of a Candidate User.
     * </p>
     *
     * @since 0.2
     */
    private final CandidateDTO dto = DTOFactory.createCandidateUser();
    /**
     * The User created by {@link UserService#saveUser(UserDTO)}.
     * <p>
     * This is used to test the creation of a Candidate User.
     * </p>
     *
     * @since 0.2
     */
    private final User user = ModelFactory.createUserCandidate();
    /**
     * The Candidate returned by the repository.
     * <p>
     * This is used to test the creation of a Candidate User.
     * </p>
     *
     * @since 0.2
     */
    private final Candidate company = ModelFactory.createCandidateUser();
    /**
     * The Repository to create the Candidate User.
     * <p>
     * This is used to test the creation of a Candidate User.
     * </p>
     *
     * @since 0.2
     */
    @Mock
    private CandidateRepo repository;
    /**
     * The Service that create the Main User.
     * <p>
     * Here are methods shared with other User Services.
     * </p>
     *
     * @since 0.2
     */
    @Mock
    private UserService userService;
    /**
     * The Service to test.
     * <p>
     * This is used to test the creation of a Candidate User.
     * </p>
     *
     * @since 0.2
     */
    @InjectMocks
    private CandidateService service;

    /**
     * Create the Candidate -
     * test if this will Create the Candidate Successfully.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Create the Candidate - Create the Candidate Successfully")
    void createCandidateCreateTheCandidateSuccessfully()
            throws UserAlreadyExistsException {
        BDDMockito.when(userService.saveUser(BDDMockito.any(UserDTO.class)))
                .thenReturn(user);
        BDDMockito.when(repository.save(BDDMockito.any(Candidate.class)))
                .thenReturn(company);

        Candidate returnedCandidate = service.createCandidate(dto);

        BDDMockito.then(userService).should()
                .saveUser(BDDMockito.any(UserDTO.class));
        Assertions.assertThat(returnedCandidate)
                .isNotNull()
                .isEqualTo(company);
    }
}
