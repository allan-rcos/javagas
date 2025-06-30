package com.javagas.api.services;

import com.javagas.api.dto.UserDTO;
import com.javagas.api.models.User;
import com.javagas.api.repositories.UserRepo;
import com.javagas.api.security.SecurityConfig;
import com.javagas.api.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * A utility service for Company and Candidate Users.
 * <p>
 * Have a Prototype Scope, so is created a new instance to all Injections.
 * This configuration is needed because every RoleService need to assign his
 * own Role.
 * </p>
 *
 * @since 0.2
 */
@Service
@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS, value = "prototype")
public class UserService {
    /**
     * User Repository used to talk to Database.
     *
     * @see org.springframework.data.jpa.repository.JpaRepository Repository.
     * @since 0.2
     */
    private final UserRepo repo;
    /**
     * A Password Encoder used to hash the password.
     *
     * @see SecurityConfig Encoder Bean Declaration.
     * @since 0.2
     */
    private final PasswordEncoder encoder;
    /**
     * The User Role Constant.
     * All the users created in this Service will have this role.
     *
     * @since 0.2
     */
    private Role authorityRole;

    /**
     * The Constructor to inject the dependencies.
     *
     * @param userRepo The User Repository, used to talk to database.
     * @param context  Get the Encoder Bean.
     * @see SecurityConfig Where are the Encode Bean.
     * @since 0.2
     */
    @Autowired
    public UserService(final UserRepo userRepo,
                       final ApplicationContext context) {
        repo = userRepo;
        encoder = context.getBean("encoder", PasswordEncoder.class);
    }

    /**
     * Encode the password and call Repository Save Method.
     *
     * @param user The User to save.
     * @return The User saved.
     * @since 0.2
     */
    public User saveUser(final User user) {
        return repo.save(user);
    }

    /**
     * Build the user, encode the password and call Repository Save Method.
     *
     * @param dto The User Data Transfer Object to build and save.
     * @return The User saved.
     * @since 0.2
     */
    public User saveUser(final UserDTO dto) {
        return this.saveUser(this.buildUser(dto));
    }

    /**
     * @return The User Authority Role.
     * @since 0.2
     */
    public Role getRole() {
        return authorityRole;
    }

    /**
     * @param role A User Role used to Build User Model Objects.
     * @since 0.2
     */
    public void setRole(final Role role) {
        this.authorityRole = role;
    }

    /**
     * A User Builder to convert UserDTO to a User Model.
     * Needs a role declaration.
     *
     * @param dto A Data Transfer Object that inherits {@link UserDTO}
     * @return A User Model.
     * @since 0.2
     */
    public User buildUser(final UserDTO dto) {
        return User.builder()
                .username(dto.getUsername())
                .password(encoder.encode(dto.getPassword()))
                .email(dto.getEmail())
                .authorityRole(authorityRole)
                .build();
    }
}
