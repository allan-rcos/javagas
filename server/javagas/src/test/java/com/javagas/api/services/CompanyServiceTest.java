package com.javagas.api.services;

import com.javagas.api.dto.CompanyDTO;
import com.javagas.api.dto.UserDTO;
import com.javagas.api.models.Company;
import com.javagas.api.models.User;
import com.javagas.api.repositories.CompanyRepo;
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
 * A Service for Company Users.
 * <p>
 * This class contains tests for the CompanyService.
 * </p>
 *
 * @version 0.2
 * @see UserService Main utility class.
 * @since 0.2
 */
@ExtendWith(SpringExtension.class)
class CompanyServiceTest {

    /**
     * The method argument DTO.
     * <p>
     * This is used to test the creation of a Company User.
     * </p>
     *
     * @since 0.2
     */
    private final CompanyDTO dto = DTOFactory.createCompanyUser();
    /**
     * The User created by {@link UserService#saveUser(UserDTO)}.
     * <p>
     * This is used to test the creation of a Company User.
     * </p>
     *
     * @since 0.2
     */
    private final User user = ModelFactory.createUserCompany();
    /**
     * The Company returned by the repository.
     * <p>
     * This is used to test the creation of a Company User.
     * </p>
     *
     * @since 0.2
     */
    private final Company company = ModelFactory.createCompanyUser();
    /**
     * The Repository to create the Company User.
     * <p>
     * This is used to test the creation of a Company User.
     * </p>
     *
     * @since 0.2
     */
    @Mock
    private CompanyRepo repository;
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
     * This is used to test the creation of a Company User.
     * </p>
     *
     * @since 0.2
     */
    @InjectMocks
    private CompanyService service;

    /**
     * Create the Company - test if this will Create the Company Successfully.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Create the Company - Create the Company Successfully")
    void createCompanyCreateTheCompanySuccessfully() {
        BDDMockito.when(userService.saveUser(BDDMockito.any(UserDTO.class)))
                .thenReturn(user);
        BDDMockito.when(repository.save(BDDMockito.any(Company.class)))
                .thenReturn(company);

        Company returnedCompany = service.createCompany(dto);

        BDDMockito.then(userService).should()
                .saveUser(BDDMockito.any(UserDTO.class));
        Assertions.assertThat(returnedCompany)
                .isNotNull()
                .isEqualTo(company);
    }
}
