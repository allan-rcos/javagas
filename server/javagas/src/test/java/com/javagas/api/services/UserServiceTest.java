package com.javagas.api.services;

import com.javagas.api.dto.UserDTO;
import com.javagas.api.exceptions.UserAlreadyExistsException;
import com.javagas.api.repositories.UserRepo;
import com.javagas.api.utils.DTOFactory;
import com.javagas.api.utils.TestConstants;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

/**
 * A Test Class for User Service.
 * <p>
 * This class will test the User Service methods.
 * The base test of this class is the buildUser method.
 * Because it needs to throw a exception if the Username or Email is already
 * registered.
 * </p>
 *
 * @version 0.2.4
 * @since 0.2.4
 */
@ExtendWith(SpringExtension.class)
class UserServiceTest {

    /**
     * User to use in tests.
     *
     * @since 0.2.4
     */
    private final UserDTO dto = DTOFactory.createCompanyUser();

    /**
     * The Password Encoder to inject as a Mock.
     * <p>
     * This is the encoder that will be used to hash the password.
     * </p>
     *
     * @since 0.2.4
     */
    @Mock
    private PasswordEncoder passwordEncoder;

    /**
     * The User Repository to inject as a Mock.
     * <p>
     * This is the repository that will be used to talk to the database.
     * </p>
     *
     * @see UserService#UserService
     * @since 0.2.4
     */
    @Mock
    private UserRepo userRepo;
    /**
     * The User Service to test.
     * <p>
     * This is the main service that will be tested.
     * </p>
     *
     * @since 0.2.4
     */
    @InjectMocks
    private UserService userService;

    /**
     * Set up the mocks before each test.
     * <p>
     * This method will be called before each test to set up the mocks.
     * In this case, it will set up the User Repository to return false
     * when checking if the username or email already exists.
     * </p>
     *
     * @since 0.2.4
     */
    @BeforeEach
    void setUp() {
        BDDMockito.when(userRepo.existsByUsername(dto.getUsername()))
                .thenReturn(false);
        BDDMockito.when(userRepo.existsByEmail(dto.getEmail()))
                .thenReturn(false);
        BDDMockito.when(passwordEncoder.encode(dto.getPassword()))
                .thenReturn(TestConstants.ENCRYPTED_PASSWORD);
    }

    /**
     * Test the buildUser method.
     * <p>
     * This test will check if the buildUser method throws an
     * {@link UserAlreadyExistsException, exception}
     * when the username already exists.
     * </p>
     *
     * @since 0.2.4
     */
    @Test
    @DisplayName("Build User Throws An Exception When Username Exists")
    void buildUserThrowsAnExceptionWhenUsernameExists() {
        String username = dto.getUsername();

        BDDMockito.when(userRepo.existsByUsername(username)).thenReturn(true);

        try {
            userService.buildUser(dto);
            Assertions.fail(
                    "Should throw an exception when username already exists");
        } catch (UserAlreadyExistsException e) {
            // Expected exception
            Assertions.assertTrue(
                    e.getMessage().toLowerCase().contains("username"),
                    "Exception message should contain 'username'"
            );
        }
    }

    /**
     * Test the buildUser method.
     * <p>
     * This test will check if the buildUser method throws an
     * {@link UserAlreadyExistsException, exception}
     * when the email already exists.
     * </p>
     *
     * @since 0.2.4
     */
    @Test
    @DisplayName("Build User Throws An Exception When Email Exists")
    void buildUserThrowsAnExceptionWhenEmailExists() {
        String email = dto.getEmail();

        BDDMockito.when(userRepo.existsByEmail(email)).thenReturn(true);

        try {
            userService.buildUser(dto);
            Assertions.fail(
                    "Should throw an exception when email already exists");
        } catch (UserAlreadyExistsException e) {
            // Expected exception
            Assertions.assertTrue(
                    e.getMessage().toLowerCase().contains("email"),
                    "Exception message should contain 'email'"
            );
        }
    }

    /**
     * Test the buildUser method.
     * <p>
     * This test will check if the buildUser method does not throw an
     * {@link UserAlreadyExistsException, exception}
     * when the username and email not exists.
     * </p>
     *
     * @since 0.2.4
     */
    @Test
    @DisplayName("Build User Not Throws Exception And Return A User Model")
    void buildUserNotThrowsExceptionAndReturnAUserModel() {
        Assertions.assertDoesNotThrow(
                () -> userService.buildUser(dto),
                "Should not throw an exception when username and "
                        + "email are valid"
        );
    }
}
