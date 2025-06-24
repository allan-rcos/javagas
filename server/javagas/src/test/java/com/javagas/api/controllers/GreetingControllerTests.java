package com.javagas.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.javagas.api.dto.Message;
import com.javagas.api.services.MessageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

/**
 * Tests from Greeting Controller. If the Hello World Message is working.
 */
@WebMvcTest(GreetingController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class GreetingControllerTests {

    /**
     * This library will send the requests.
     */
    @Autowired
    private MockMvc mockMvc;
    /**
     * The service that create a Message Object.
     */
    @MockitoBean
    private MessageService messageService;
    /**
     * The class that will convert an object to a JSON string.
     */
    @Autowired
    private ObjectMapper objectMapper;
    /**
     * The Message Object used in the tests.
     */
    private Message message;

    /**
     * Method that will run before each test to create a Message Object.
     */
    @BeforeEach
    public void setup() {
        message = new Message("Hello World");
    }

    /**
     * Test if the "/hello" route will return "Hello World".
     */
    @Test
    @DisplayName("If Greeting Controller"
            + "have \"Hello World\" Message in Response")
    public void helloWillReturnAMessage() throws Exception {
        // arrange
        given(messageService.createMessage(ArgumentMatchers.any()))
                .willReturn(message);
        // act
        ResultActions response = mockMvc.perform(get("/hello"));
        //assert
        response.andExpect(MockMvcResultMatchers.status().isOk());
        response.andExpect(MockMvcResultMatchers.content()
                .json(objectMapper.writeValueAsString(message)));
    }
}
