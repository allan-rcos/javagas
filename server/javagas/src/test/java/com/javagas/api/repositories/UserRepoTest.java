package com.javagas.api.repositories;

import com.javagas.api.models.User;
import com.javagas.api.utils.ModelFactory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

/**
 * Tests for {@link UserRepo User Repository}.
 * <p>
 * This class will test the methods of the User Repository.
 * </p>
 *
 * @since 0.2
 */
@DataJpaTest
@DisplayName("Tests for User Repository")
class UserRepoTest {

    /**
     * The User Repository. This class will make the Database Communication.
     *
     * @see UserRepo User Repository
     * @since 0.2
     */
    private final User user = ModelFactory.createUserCandidate();
    /**
     * The User Repository. This class will make the Database Communication.
     *
     * @see UserRepo User Repository
     * @since 0.2
     */
    private final UserRepo repo;

    /**
     * The constructor that Spring will use to build the Repository.
     *
     * @param repository Used to communicate with the Database.
     * @since 0.2
     */
    UserRepoTest(@Autowired final UserRepo repository) {
        repo = repository;
    }

    /**
     * Test for {@link UserRepo#findUserByUsername(String)}.
     * This method will test if the User Repository can find
     * a user by its username.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Test findUserByUsername is finding a user by username.")
    void findUserByUsernameSuccessfully() {
        repo.save(user);
        User foundUser = repo.findUserByUsername(user.getUsername())
                .orElseThrow(() ->
                        new AssertionError("User not found."));
        Assertions.assertEquals(user.getUsername(),
                foundUser.getUsername(),
                "Usernames should match.");
    }

    /**
     * Test for {@link UserRepo#findUserByUsername(String)}.
     * This method will test if the User Repository don't find
     * a user by its username when it does not exist.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Test findUserByUsername is not finding user by a username "
            + "that not exists on database.")
    void findUserByUsernameNotFound() {
        Optional<User> foundUser = repo.findUserByUsername(user.getUsername());
        Assertions.assertFalse(foundUser.isPresent(),
                "User should not be found in the database.");
    }


    /**
     * Test for {@link UserRepo#existsByUsername(String)}.
     * This method will test if the User Repository can check
     * if a username exists in the database.
     *
     * @since 0.2
     */
    @Test
    @DisplayName("Test existsByUsername is checking if a username exists")
    void existsByUsernameSuccessfully() {
        repo.save(user);
        boolean exists = repo.existsByUsername(user.getUsername());
        Assertions.assertTrue(exists,
                "User should exist in the database.");
    }
}
