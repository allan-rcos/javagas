package com.javagas.api.exceptions;

import lombok.experimental.StandardException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown when a user already exists in the system.
 * This exception is used to indicate that an attempt was made to create
 * a user that already exists, typically during user registration.
 *
 * @version 0.2.4
 * @since 0.2.4
 */
@StandardException
@ResponseStatus(HttpStatus.CONFLICT)
public class UserAlreadyExistsException extends RuntimeException {
}
