package com.javagas.api.handlers;

import com.javagas.api.dto.MessageResponse;
import com.javagas.api.exceptions.UserAlreadyExistsException;
import com.javagas.api.services.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

/**
 * A Handler to Manage Exceptions in the REST API.
 *
 * @version 0.2.4
 * @since 0.2
 */
@RestControllerAdvice
@Log4j2
@RequiredArgsConstructor
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    /**
     * The service that will create the Message Object.
     *
     * @since 0.2.4
     */
    private final MessageService service;

    /**
     * Handles MethodArgumentNotValidException to return a custom error
     * response.
     *
     * @param ex      the exception that was thrown
     * @param headers the HTTP headers
     * @param status  the HTTP status code
     * @param request the web request
     * @return a ResponseEntity containing validation errors such List.
     * @since 0.2
     */
    @Override
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            final MethodArgumentNotValidException ex,
            final HttpHeaders headers,
            final HttpStatusCode status,
            final WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        logger.debug(errors);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles UserAlreadyExistsException to return a custom error response.
     * Like {@link com.javagas.api.dto.MessageResponse} with a message.
     *
     * @param ex the exception that was thrown
     * @return a ResponseEntity containing the error message.
     * @since 0.2.4
     */
    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(UserAlreadyExistsException.class)
    protected ResponseEntity<MessageResponse> handleErrorResponseException(
            final UserAlreadyExistsException ex) {
        String message = "Bad Request: " + ex.getMessage();
        logger.error(message, ex);
        return new ResponseEntity<>(service.createMessage(message),
                HttpStatus.CONFLICT);
    }
}
