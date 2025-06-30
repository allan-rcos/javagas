package com.javagas.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * A Data Transfer Object Used with Login data.
 *
 * @see com.javagas.api.models.User
 * @since 0.2
 */
@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    /**
     * A Username that User will have. It can't be changed before.
     *
     * @see com.javagas.api.models.User
     * @since 0.2
     */
    @NotBlank
    private String username;
    /**
     * The Password used in Login.
     *
     * @see com.javagas.api.models.User
     * @since 0.2
     */
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}$",
            message = "Too weak password.")
    private String password;
}
