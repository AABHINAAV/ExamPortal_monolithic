package com.exam.services;

import com.exam.models.exam.Question;
import com.exam.models.exam.Quiz;

import java.util.Set;

public interface QuestionService {
    public Question addQuestion(Question question);
    public Question updateQuestion(Question question);
    public Set<Question> getAllQuestions();
    public Question getQuestion(Long questionId);
    public Set<Question> getQuestionsOfQuiz(Quiz quiz);
}
