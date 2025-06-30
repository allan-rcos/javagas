package com.javagas.api.repositories;

import com.javagas.api.models.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The Candidate User Model Repository.
 *
 * @see JpaRepository
 * @since 0.2
 */
@Repository
public interface CandidateRepo extends JpaRepository<Candidate, Long> {
}
