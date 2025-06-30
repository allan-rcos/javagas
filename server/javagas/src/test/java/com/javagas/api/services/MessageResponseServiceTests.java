package com.javagas.api.services;

import com.javagas.api.dto.MessageResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * A test class for Message Service.
 *
 * @see MessageService
 * @since 0.1
 */
@SpringBootTest
public class MessageResponseServiceTests {
    /**
     * The service that will be tested.
     *
     * @since 0.1
     */
    @Autowired
    private MessageService messageService;

    /**
     * Test if the message will be created fine.
     *
     * @since 0.1
     */
    @Test
    @DisplayName("Test if the Message Service will create a new Message Object")
    public void createTestWillReturnAMessageObject() {
        // arrange
        String message = "Hello World";
        // act
        MessageResponse messageResponseObject = messageService.createMessage(message);
        // assert
        assertThat(messageResponseObject).isNotNull();
        assertThat(messageResponseObject.getMessage()).isEqualTo(message);
    }
}
