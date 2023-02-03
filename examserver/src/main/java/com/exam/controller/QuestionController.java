package com.exam.controller;

import com.exam.models.exam.Question;
import com.exam.models.exam.Quiz;
import com.exam.services.QuestionService;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // add question
    @PostMapping("/addQuestion")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question res = this.questionService.addQuestion(question);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // update question
    @PutMapping("/updateQuestion")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question) {
        Question res = this.questionService.updateQuestion(question);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get all Question of all quizes
    @GetMapping("/getAllQuestions")
    public ResponseEntity<Set<Question>> getAllQuestions() {
        Set<Question> res = this.questionService.getAllQuestions();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get single Question according to question id
    @GetMapping("/getQuestion/{questionId}")
    public ResponseEntity<Question> getQuestion(@PathVariable("questionId") Long questionId) {
        Question res = this.questionService.getQuestion(questionId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get all questions of specific quiz
    @GetMapping("/getAllQuestionsOfQuiz/{quizId}")
    public ResponseEntity<?> getAllQuestionsOfQuiz(@PathVariable("quizId") Long quizId) {
        Quiz quiz = new Quiz();
        quiz.setqID(quizId);
        Set<Question> questionsOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return new ResponseEntity<>(questionsOfQuiz, HttpStatus.OK);
    }

    // get required questions of specific quiz
    @GetMapping("/getRequiredQuestionsOfQuiz/{quizId}")
    public ResponseEntity<?> getRequiredQuestionsOfQuiz(@PathVariable("quizId") Long quizId) {
        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questionsSet = quiz.getQuestions();
        List questionList = new ArrayList(questionsSet);
        Collections.shuffle(questionList);

        int requiredSize = Integer.parseInt(quiz.getTotalQuestion());
        int currentSize = questionList.size();

        if (currentSize > requiredSize) {
            questionList = questionList.subList(0, requiredSize + 1);
        }

        return new ResponseEntity<>(questionList, HttpStatus.OK);
    }

    // delete question
    @DeleteMapping("/deleteQuestion/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId) {
        this.questionService.deleteQuestion(questionId);
    }

    // evaluate quiz on server side
    @PostMapping("/evaluateQuizServerSide")
    public ResponseEntity<?> evaluateQuizServerSide(@RequestBody List<Question> questionsData) {
        System.out.println("yoyo honey singh");

        Double marksGot = Double.valueOf(0);
        Integer correctAnswers = 0;
        Integer attempted = 0;

        for (Question question : questionsData) {
            if (question.getGivenAnswer() != null) {
                attempted++;

                Long questionId = question.getQuesId();
                String answer = this.questionService.getQuestion(questionId).getAnswer();

                if (question.getGivenAnswer().equals(answer)) {
                    correctAnswers++;
                }
            }
        }

        marksGot = correctAnswers * Double.parseDouble(questionsData.get(0).getQuiz().getMaxMarks()) / Double.parseDouble(questionsData.get(0).getQuiz().getTotalQuestion());

        Map<String, Object> res = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted", attempted);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
