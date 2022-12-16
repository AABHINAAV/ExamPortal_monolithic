package com.exam.controller;

import com.exam.models.exam.Question;
import com.exam.models.exam.Quiz;
import com.exam.services.QuestionService;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

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

    // get all Question
    @GetMapping("/getAllQuestions")
    public ResponseEntity<Set<Question>> getAllQuestions() {
        Set<Question> res = this.questionService.getAllQuestions();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get Question
    @GetMapping("/getQuestion/{questionId}")
    public ResponseEntity<Question> getQuestion(@PathVariable("questionId") Long questionId) {
        Question res = this.questionService.getQuestion(questionId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get question of specific quiz
    @GetMapping("/getQuestionsOfQuiz/{quizId}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("quizId") Long quizId) {
        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questionsSet = quiz.getQuestions();
        List questionList = new ArrayList(questionsSet);
        Collections.shuffle(questionList);

        int requiredSize = Integer.parseInt(quiz.getTotalQuestion());
        int currentSize = questionList.size();

        if(currentSize > requiredSize){
            questionList = questionList.subList(0, requiredSize+1);
        }

        return new ResponseEntity<>(questionList, HttpStatus.OK);
    }

    // delete question
    @DeleteMapping("/deleteQuestion/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId){
        this.questionService.deleteQuestion(questionId);
    }
}
