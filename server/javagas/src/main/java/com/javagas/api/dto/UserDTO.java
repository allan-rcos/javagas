package com.javagas.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.stereotype.Component;

/**
 * A User Data Transfer Object. Abstract class used to User Children Classes.
 *
 * @see com.javagas.api.models.User
 * @see CompanyDTO
 * @since 0.2
 */
@Component
@Setter
@Getter
@ToString(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO extends LoginDTO {
    /**
     * The User Email. After this will be used to verify identity.
     *
     * @see com.javagas.api.models.User
     * @since 0.2
     */
    @NotBlank
    @Email
    private String email;
}
