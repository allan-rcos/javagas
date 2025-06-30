package com.javagas.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A Message Class to use in Errors or general messages.
 *
 * @since 0.1
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponse {
    /**
     * The message to show to user.
     *
     * @since 0.1
     */
    private String token;
}
