package com.exam.services;

import com.exam.models.exam.Category;
import com.exam.models.exam.Quiz;

import java.util.Set;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getAllQuizes();
    public Quiz getQuiz(Long quizId);
    public Set<Quiz> getAllQuizesByCategory(Category category);
    public void deleteQuiz(Long quizId);
    public Set<Quiz> getAllActiveQuizes();
    public Set<Quiz> getAllActiveQuizesOfCategory(Category category);
}
