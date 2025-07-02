package com.javagas.api.controllers;


import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit.jupiter.SpringExtension;

/**
 * Unit Test Class for {@link EnumController}.
 *
 * @version 0.2.2
 * @since 0.2.2
 */
@ExtendWith(SpringExtension.class)
@DisplayName("EnumController Tests")
class EnumControllerTest {
    /**
     * The controller to be tested.
     *
     * @since 0.2.2
     */
    @InjectMocks
    private EnumController controller;

    /**
     * Test to verify that the getIndustries method
     * returns a non-empty array of industries.
     *
     * @since 0.2.2
     */
    @Test
    @DisplayName("getIndustries should return a non-empty array of industries.")
    void getIndustriesWillReturnAObjectWithAllIndustries() {
        var response = controller.getIndustries();
        var body = response.getBody();

        Assertions.assertThat(response.getStatusCode())
                .isEqualTo(HttpStatus.OK);
        Assertions.assertThat(body).isNotNull();
        Assertions.assertThat(body.size()).isGreaterThan(0);
    }
}
