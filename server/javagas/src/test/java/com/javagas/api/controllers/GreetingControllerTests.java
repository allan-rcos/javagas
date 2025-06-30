package com.javagas.api.controllers;

import com.javagas.api.dto.MessageResponse;
import com.javagas.api.services.MessageService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

/**
 * Tests from Greeting Controller. If the Hello World Message is working.
 *
 * @since 0.1
 */
@ExtendWith(SpringExtension.class)
public class GreetingControllerTests {
    /**
     * The service that create a Message Object.
     *
     * @since 0.1
     */
    @Mock
    private MessageService service;
    /**
     * The controller that will handle the "/hello" route.
     *
     * @since 0.2
     */
    @InjectMocks
    private GreetingController controller;
    /**
     * The Message Object that will be returned by the service.
     *
     * @since 0.2
     */
    private MessageResponse dto;

    /**
     * Method that will run before each test to create a Message Object.
     *
     * @since 0.2
     */
    @BeforeEach
    public void setup() {
        dto = new MessageResponse("Hello World");
        BDDMockito.when(service.createMessage(ArgumentMatchers.anyString()))
                .thenReturn(dto);
    }

    /**
     * Test if the "/hello" route will return "Hello World".
     *
     * @since 0.1
     */
    @Test
    @DisplayName("Testing if Greeting Controller hello route"
            + "have \"Hello World\" Message in Response")
    public void helloWillReturnAMessage() throws Exception {
        ResponseEntity<MessageResponse> response = controller.hello();
        MessageResponse body = response.getBody();
        //assert
        Assertions.assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        Assertions.assertThat(body).isNotNull();
        Assertions.assertThat(body.getMessage())
                .isEqualTo(dto.getMessage());
    }
}
