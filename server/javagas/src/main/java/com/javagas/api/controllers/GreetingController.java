package com.javagas.api.controllers;

import com.javagas.api.dto.Message;
import com.javagas.api.services.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This is a test Controller, to do Hello World.
 */
@RestController
public class GreetingController {
    /**
     * The service that will create the Message Object.
     */
    private final MessageService messageService;

    /**
     * The constructor to inject the dependencies.
     *
     * @param service A Message Service that will create Message Objects.
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
    public ResponseEntity<Message> hello() {
        return ResponseEntity.ok(messageService.createMessage("Hello World"));
    }
}
