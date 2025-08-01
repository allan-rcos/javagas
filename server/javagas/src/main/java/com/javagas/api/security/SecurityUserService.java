package com.javagas.api.security;

import com.javagas.api.models.User;
import com.javagas.api.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * Spring Boot User Detail Service.
 * <p>
 * This class will map the {@link User ApiUser} to
 * {@link org.springframework.security.core.userdetails.User SpringUser}.
 * </p>
 *
 * @since 0.2
 * @deprecated Use {@link com.javagas.api.services.SecurityUserService} instead.
 */
@Deprecated(forRemoval = true, since = "0.2.4")
public class SecurityUserService implements UserDetailsService {
    /**
     * The User Repository. This class will make the Database Communication.
     *
     * @see UserRepo User Repository
     * @since 0.2
     */
    private final UserRepo repository;

    /**
     * The constructor that Spring will use to build the Service.
     *
     * @param userRepo Used to communicate with the Database.
     * @since 0.2
     */
    public SecurityUserService(@Autowired final UserRepo userRepo) {
        this.repository = userRepo;
    }

    /**
     * The method that make the conversion.
     *
     * @param username The username to search in database.
     * @return The {@link UserDetails User} required to Authorization.
     * @throws UsernameNotFoundException If The user doesn't exist in Database.
     * @since 0.2
     */
    @Override
    public UserDetails loadUserByUsername(final String username)
            throws UsernameNotFoundException {
        User user = repository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return new SecurityUser(user);
    }
}
