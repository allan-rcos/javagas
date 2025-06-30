package com.javagas.api.integration;

import com.javagas.api.dto.MessageResponse;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Tests from Greeting Controller. If the Hello World Message is working.
 *
 * @since 0.1
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GreetingIT {
    @Autowired
    @Qualifier("guestClient")
    private TestRestTemplate guest;

    /**
     * Test if the "/hello" route will return "Hello World".
     *
     * @since 0.1
     */
    @Test
    @DisplayName("Testing if Greeting Controller hello route"
            + "have \"Hello World\" Message in Response")
    public void helloWillReturnAMessage() throws Exception {
        ResponseEntity<MessageResponse> response = guest.getForEntity(
                "/greeting/hello", MessageResponse.class);
        MessageResponse body = response.getBody();
        //assert
        Assertions.assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        Assertions.assertThat(body).isNotNull();
    }

    @TestConfiguration
    @Lazy
    static class Config {
        @Bean(name = "guestClient")
        public TestRestTemplate testRestTemplateGuest(
                @Value("${local.server.port}") final int port) {
            RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder()
                    .rootUri("http://localhost:" + port + "/api");
            return new TestRestTemplate(restTemplateBuilder);
        }
    }
}
