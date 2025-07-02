package com.javagas.api.controllers;

import com.javagas.api.dto.MessageResponse;
import com.javagas.api.services.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This is a test Controller, to do Hello World.
 *
 * @since 0.1
 */
@Tag(name = "Greeting",
        description = "Routes that return a Hello World message")
@Tag(name = "V1", description = "Version 1 of the API")
@RestController
@RequestMapping("/api/v1/greeting")
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
    @Operation(
            summary = "Hello World",
            description = "Returns a Hello World message"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Returns a Hello World message"
            )
    })
    @GetMapping("/hello")
    public ResponseEntity<MessageResponse> hello() {
        return ResponseEntity.ok(messageService.createMessage("Hello World"));
    }
}
