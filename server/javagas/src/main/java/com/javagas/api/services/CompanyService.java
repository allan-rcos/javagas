package com.javagas.api.services;

import com.javagas.api.dto.CompanyDTO;
import com.javagas.api.models.Company;
import com.javagas.api.models.User;
import com.javagas.api.repositories.CompanyRepo;
import com.javagas.api.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * A Service for Company Users.
 *
 * @see UserService Main utility class.
 * @since 0.2
 */
@Service
public class CompanyService {
    /**
     * The Service that create the Main User.
     * <p>
     * Here are methods shared with other User Services.
     * </p>
     *
     * @since 0.2
     */
    private final UserService userService;

    /**
     * Repository used to talk to database.
     *
     * @see org.springframework.data.jpa.repository.JpaRepository Repository
     * @since 0.2
     */
    private final CompanyRepo repository;

    /**
     * The Constructor to inject the dependencies.
     *
     * @param service The Service that create the Main User.
     * @param repo    The Repository of the Additional Fields for this Role.
     * @since 0.2
     */
    @Autowired
    public CompanyService(final UserService service,
                          final CompanyRepo repo) {
        service.setRole(Role.COMPANY);
        userService = service;
        repository = repo;
    }

    /**
     * Create the Main User and the Company SubTable.
     *
     * @param dto The User to save.
     * @return The User saved.
     * @since 0.2
     */
    public Company createCompany(final CompanyDTO dto) {
        User user = userService.saveUser(dto);
        Company company = Company.buildWithDTO(user, dto);
        return repository.save(company);
    }
}
