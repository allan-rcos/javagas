package com.javagas.api.services;

import com.javagas.api.dto.CandidateDTO;
import com.javagas.api.exceptions.UserAlreadyExistsException;
import com.javagas.api.models.Candidate;
import com.javagas.api.models.User;
import com.javagas.api.repositories.CandidateRepo;
import com.javagas.api.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * A Service for Candidate Users.
 *
 * @version 0.2.4
 * @see UserService Main utility class.
 * @since 0.2
 */
@Service
public class CandidateService {
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
    private final CandidateRepo repository;

    /**
     * The Constructor to inject the dependencies.
     *
     * @param service The Service that create the Main User.
     * @param repo    The Repository of the Additional Fields for this Role.
     * @since 0.2
     */
    @Autowired
    public CandidateService(final UserService service,
                            final CandidateRepo repo) {
        service.setRole(Role.CANDIDATE);
        userService = service;
        repository = repo;
    }

    /**
     * Create new Main User and the Company SubTable.
     *
     * @param dto The User to save.
     * @return The User saved.
     * @since 0.2
     */
    public Candidate createCandidate(final CandidateDTO dto)
            throws UserAlreadyExistsException {
        User user = userService.saveUser(dto);
        Candidate candidate = Candidate.buildWithDTO(user, dto);
        return repository.save(candidate);
    }
}
