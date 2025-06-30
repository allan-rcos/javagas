package com.javagas.api.repositories;

import com.javagas.api.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The Company User Model Repository.
 *
 * @see JpaRepository
 * @since 0.2
 */
@Repository
public interface CompanyRepo extends JpaRepository<Company, Long> {
}
