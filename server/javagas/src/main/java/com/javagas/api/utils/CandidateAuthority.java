package com.javagas.api.utils;

import org.springframework.security.core.GrantedAuthority;

/**
 * The Candidate Authority.
 * A <i>"Permission"</i> for all the Candidate Actions.
 *
 * @since 0.2
 */
public class CandidateAuthority implements GrantedAuthority {
    /**
     * The Candidate Authority. A String to define the Authority.
     *
     * @return {@literal "CANDIDATE"}
     * @since 0.2
     */
    @Override
    public String getAuthority() {
        return "CANDIDATE";
    }
}
