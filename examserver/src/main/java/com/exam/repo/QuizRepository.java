package com.exam.repo;

import com.exam.models.exam.Category;
import com.exam.models.exam.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    Set<Quiz> findByCategory(Category category);
    Set<Quiz> findByIsActive(boolean active);
    Set<Quiz> findByCategoryAndIsActive(Category category, boolean active);
}
