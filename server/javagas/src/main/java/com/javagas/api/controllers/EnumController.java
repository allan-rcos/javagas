package com.javagas.api.controllers;

import com.javagas.api.utils.Industry;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller for handling enum-related endpoints.
 * This is a placeholder for future implementation of enum-related
 * functionality.
 *
 * @version 0.2.2
 * @since 0.2.2
 */
@RestController
@RequestMapping("/api/v1/enums")
@Tag(name = "V1", description = "Version 1 of the API")
@Tag(name = "Enums", description = "Enums used in the API."
        + "This is a placeholder for future enum-related endpoints.")
public class EnumController {
    /**
     * Endpoint to retrieve the list of industries.
     * This is a placeholder for future implementation.
     *
     * @return ResponseEntity containing the list of industries
     * @since 0.2.2
     */
    @GetMapping("/industries")
    @Operation(
            summary = "Get Industries",
            description = "Returns a list of industries defined in the"
                    + "Industry enum."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Returns a List of Industries such String."
            )
    })
    public ResponseEntity<List<String>> getIndustries() {
        return ResponseEntity.ok(List.of(Industry.toArray()));
    }
}
