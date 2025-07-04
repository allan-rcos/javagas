package com.javagas.api.utils;

/**
 * A Static class with constants used in this package.
 *
 * @version 0.2.4
 * @since 0.2 As part of Security package.
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
