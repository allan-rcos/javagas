package com.javagas.api.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

/**
 * Enumeration of Roles accepted in the Application.
 *
 * @since 0.2
 */
@Getter
@AllArgsConstructor
public enum Role {
    /**
     * The Role for Companies, can create new Jobs and Skills.
     * RoleID: 0.
     *
     * @since 0.2
     */
    COMPANY((byte) 0, new CompanyAuthority()),
    /**
     * The Role for Jobs Candidates, can apply in Jobs and Have Skills.
     * RoleID: 1
     *
     * @since 0.2
     */
    CANDIDATE((byte) 1, new CandidateAuthority());

    /**
     * The id that will be assigned to Authority field of user.
     *
     * @since 0.2
     */
    private final byte roleId;
    /**
     * The User Authority. Can be
     * {@link CompanyAuthority Company} or {@link CandidateAuthority Candidate}
     *
     * @since 0.2
     */
    private final GrantedAuthority authorityClass;
}
