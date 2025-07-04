package com.javagas.api.models;

import com.javagas.api.utils.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The main User class.
 *
 * @version 0.2.4
 * @since 0.2
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
    /**
     * The User Primary ID.
     *
     * @since 0.2
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * Username used in login.
     *
     * @since 0.2
     */
    @Column(unique = true)
    private String username;
    /**
     * Email to verify identity. Is public to Companies.
     *
     * @see Role
     * @since 0.2
     */
    @Column(unique = true)
    private String email;
    /**
     * Password used in login.
     *
     * @since 0.2
     */
    private String password;
    /**
     * If the user is verified, or not.
     * <p>
     * <strong>Experimental!</strong>
     * The verification will be made by email. It will be implemented in
     * future updates.
     * </p>
     *
     * @since 0.2
     */
    private boolean verified = false;
    /**
     * User Role.
     * <p>
     * The user can be in these roles:
     *     <ul>
     *         <li>Company;</li>
     *         <li>Candidate.</li>
     *     </ul>
     *     <small><strong>This can't be changed before.</strong></small>
     * </p>
     *
     * @see Role The Enumeration with all the program roles.
     * @since 0.2
     */
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "authority")
    @NotNull
    private Role authorityRole;
}
