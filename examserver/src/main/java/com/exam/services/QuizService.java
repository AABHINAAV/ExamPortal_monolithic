package com.exam.services;

import com.exam.models.exam.Quiz;

import java.util.Set;

public interface QuizService {
    public Quiz addQuiz(Quiz quiz);
    public Quiz updateQuiz(Quiz quiz);
    public Set<Quiz> getAllQuizes();
    public Quiz getQuiz(Long quizId);
    public void deleteQuiz(Long quizId);
}
