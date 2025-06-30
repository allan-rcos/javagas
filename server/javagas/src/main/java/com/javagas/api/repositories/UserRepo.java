package com.javagas.api.repositories;

import com.javagas.api.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * The User Model Repository.
 *
 * @see org.springframework.data.jpa.repository.JpaRepository
 * @since 0.2
 */
@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    /**
     * Find in the Database the user with the provided Username.
     *
     * @param username Username to search in the Database
     * @return The User, but its Optional, because can be not found.
     * @since 0.2
     */
    Optional<User> findUserByUsername(String username);

    /**
     * Check if the username exists in the Database.
     *
     * @param username The username to search.
     * @return A Boolean, if exists or not.
     * @since 0.2
     */
    Boolean existsByUsername(String username);
}
