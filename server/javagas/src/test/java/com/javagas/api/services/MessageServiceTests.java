package com.javagas.api.services;

import com.javagas.api.dto.Message;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class MessageServiceTests {
    /**
     * The service that will be tested.
     */
    @Autowired
    private MessageService messageService;

    /**
     * Test if the message will be created fine.
     */
    @Test
    @DisplayName("Test if the Message Service will create a new Message Object")
    public void createTestWillReturnAMessageObject() {
        // arrange
        String message = "Hello World";
        // act
        Message messageObject = messageService.createMessage(message);
        // assert
        assertThat(messageObject).isNotNull();
        assertThat(messageObject.getMessage()).isEqualTo(message);
    }
}
