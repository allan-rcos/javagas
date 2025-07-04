package com.javagas.api.models;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

/**
 * Middle class used in the User Mapping.
 * <p>
 * When something is get here, it will be mapped using
 * {@link User User Model} information.
 * </p>
 *
 * @since 0.2
 */
@AllArgsConstructor
public class SecurityUser implements
        org.springframework.security.core.userdetails.UserDetails {
    /**
     * User that {@link
     * org.springframework.security.core.userdetails.UserDetails
     * UserDetails} will map.
     *
     * @since 0.2
     */
    private User user;

    /**
     * An array with the {@link com.javagas.api.utils.Role User Role}.
     * <p>
     * The Authorities normally is used like an array with "Permissions"
     * </p>
     *
     * @return The User Authority.
     * @see com.javagas.api.utils.CandidateAuthority Candidate Authority
     * @see com.javagas.api.utils.CompanyAuthority Company Authority
     * @since 0.2
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(
                user.getAuthorityRole().getAuthorityClass()
        );
    }

    /**
     * User Password.
     *
     * @return {@link User User} Password Field.
     * @since 0.2
     */
    @Override
    public String getPassword() {
        return user.getPassword();
    }


    /**
     * User Username.
     *
     * @return {@link User User} Username Field.
     * @since 0.2
     */
    @Override
    public String getUsername() {
        return user.getUsername();
    }

    /**
     * If user is expired.
     * <p>
     *     Todo: This will be implemented in the future to Non Validated Users.
     * </p>
     *
     * @return {@literal true}
     * @since 0.2
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * If the account is locked by security issues.
     * <p>
     *     Todo: Will be implemented with LoginAttempt.
     * </p>
     *
     * @return {@literal true}.
     * @since 0.2
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     *
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * To User be enabled it will need to proceed with email verification.
     *
     * @return If user is Enabled, only enabled users can access repositories.
     * @since 0.2
     */
    @Override
    public boolean isEnabled() {
        return true; // user.isVerified();
    }
}
