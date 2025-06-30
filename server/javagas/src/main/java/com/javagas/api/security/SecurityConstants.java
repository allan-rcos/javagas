package com.javagas.api.security;

/**
 * A Static class with constants used in this package.
 *
 * @since 0.2
 */
public final class SecurityConstants {
    /**
     * A Time Expiration for the JWT Token. Default {@value}.
     *
     * @since 0.2
     */
    public static final long JWT_EXPIRATION = 3600;

    /**
     * The Authentication Token Type. Default {@value}
     *
     * @since 0.2
     */
    public static final String TOKEN_TYPE = "Bearer";

    private SecurityConstants() {
        throw new IllegalStateException("Utility class");
    }
}
