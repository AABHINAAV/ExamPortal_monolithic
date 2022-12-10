package com.exam.services.impl;

import com.exam.models.exam.Quiz;
import com.exam.repo.QuizRepository;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;

public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return this.quizRepository.save(quiz);
    }

    @Override
    public Set<Quiz> getAllQuizes() {
        return new HashSet<>(this.quizRepository.findAll());
    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return this.quizRepository.findById(quizId).get();
    }

    @Override
    public void deleteQuiz(Long quizId) {
        Quiz quiz = new Quiz();
        quiz.setqID(quizId);
        this.quizRepository.delete(quiz);
    }
}
