package com.javagas.api.utils;

import org.springframework.security.core.GrantedAuthority;

/**
 * The Company Authority.
 * A <i>"Permission"</i> for all the Company Actions.
 *
 * @since 0.2
 */
public class CompanyAuthority implements GrantedAuthority {
    /**
     * The Company Authority. A String to define the Authority.
     *
     * @return {@literal "COMPANY"}
     * @since 0.2
     */
    @Override
    public String getAuthority() {
        return "COMPANY";
    }
}
