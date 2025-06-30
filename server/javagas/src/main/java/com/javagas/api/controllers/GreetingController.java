package com.javagas.api.controllers;

import com.javagas.api.dto.MessageResponse;
import com.javagas.api.services.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This is a test Controller, to do Hello World.
 *
 * @since 0.1
 */
@RestController
@RequestMapping("/api/greeting")
public class GreetingController {
    /**
     * The service that will create the Message Object.
     *
     * @since 0.1
     */
    private final MessageService messageService;

    /**
     * The constructor to inject the dependencies.
     *
     * @param service A Message Service that will create Message Objects.
     * @since 0.1
     */
    public GreetingController(final MessageService service) {
        this.messageService = service;
    }

    /**
     * This is a Test route to return a Hello message.
     *
     * @return A "Hello World" message.
     */
    @GetMapping("/hello")
    public ResponseEntity<MessageResponse> hello() {
        return ResponseEntity.ok(messageService.createMessage("Hello World"));
    }
}
