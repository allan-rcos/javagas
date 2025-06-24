package com.javagas.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A Message Class to use in Errors or general messages.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    /**
     * The message to show to user.
     */
    private String message;
}
