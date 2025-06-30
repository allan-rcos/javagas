package com.javagas.api.security;

import com.javagas.api.models.User;
import com.javagas.api.repositories.UserRepo;
import com.javagas.api.utils.ModelFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@ExtendWith(MockitoExtension.class)
class SecurityUserServiceTest {

    /**
     * The User Repository. This class will make the Database Communication.
     *
     * @see UserRepo User Repository
     * @since 0.2
     */
    private final User user = ModelFactory.createUserCandidate();
    /**
     * The User Repository. This class will make the Database Communication.
     *
     * @see UserRepo User Repository
     * @since 0.2
     */
    @Mock
    private UserRepo repo;
    /**
     * The Spring Boot User Detail Service.
     * <p>
     * This class will map the {@link com.javagas.api.models.User ApiUser} to
     * {@link org.springframework.security.core.userdetails.User SpringUser}.
     * </p>
     *
     * @since 0.2
     */
    @InjectMocks
    private SecurityUserService securityUserService;

    /**
     * Load User By Username With Existing User return a user.
     * <p>
     * This test will check if the method `loadUserByUsername` returns a user.
     * When repository returns it with success.
     * </p>
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Load User By Username With Existing User Successfully "
            + "And test if UserDetails Methods are correct.")
    public void loadUserByUsernameWithExistingUserSuccessfully() {
        BDDMockito.when(repo.findUserByUsername(user.getUsername()))
                .thenReturn(java.util.Optional.of(user));

        UserDetails details =
                securityUserService.loadUserByUsername(user.getUsername());

        Assertions.assertNotNull(details,
                "UserDetails should not be null");
        Assertions.assertEquals(user.getUsername(), details.getUsername(),
                "Usernames should match");
        Assertions.assertEquals(user.getPassword(), details.getPassword(),
                "Passwords should match");
        Assertions.assertEquals(user.getAuthorityRole().getAuthorityClass(),
                details.getAuthorities().iterator().next(),
                "Authorities Role should match");
    }

    /**
     * Load User By Username With Non-Existing User
     * throws UsernameNotFoundException.
     * <p>
     * This test will check if the method `loadUserByUsername`
     * throws an exception when the user does not exist in the repository.
     * </p>
     *
     * @since 0.2
     */
    @Test
    @DisplayName("loadUserByUsername With Non-Existing User Throws Exception")
    public void loadUserByUsernameWithNonExistingUserThrowsException() {
        BDDMockito.when(repo.findUserByUsername(user.getUsername()))
                .thenReturn(java.util.Optional.empty());

        Assertions.assertThrows(
                UsernameNotFoundException.class,
                () -> securityUserService
                        .loadUserByUsername(user.getUsername()),
                "Expected UsernameNotFoundException to be thrown"
        );
    }
}
