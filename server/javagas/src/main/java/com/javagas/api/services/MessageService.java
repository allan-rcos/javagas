package com.javagas.api.services;

import com.javagas.api.dto.MessageResponse;
import org.springframework.stereotype.Service;

/**
 * The server to create Messages. These Objects are not saved in the database!
 *
 * @since 0.1
 */
@Service
public class MessageService {
    /**
     * Create a new message Object.
     *
     * @param message A message that the object will send.
     * @return A Message Object with the message from the param.
     * @since 0.1
     */
    public MessageResponse createMessage(final String message) {
        return new MessageResponse(message);
    }
}
