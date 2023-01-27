package com.exam.controller;

import com.exam.models.exam.Category;
import com.exam.models.exam.Quiz;
import com.exam.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // add quiz
    @PostMapping("/addQuiz")
    public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz quiz){
        Quiz res = this.quizService.addQuiz(quiz);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // update quiz
    @PutMapping("/updateQuiz")
    public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz quiz){
        Quiz res = this.quizService.updateQuiz(quiz);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get all quizes
    @GetMapping("/getAllQuizes")
    public ResponseEntity<Set<Quiz>> getAllQuizes(){
        Set<Quiz> res = this.quizService.getAllQuizes();
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get quiz by quiz id
    @GetMapping("/getQuiz/{quizId}")
    public ResponseEntity<?> getQuiz(@PathVariable("quizId") Long quizId){
        Quiz res = this.quizService.getQuiz(quizId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get all quizes of specific category
    @GetMapping("/getAllQuizesOfCategory/{categoryId}")
    public ResponseEntity<?> getAllQuizesOfCategory(@PathVariable("categoryId") Long categoryId){
        Category category = new Category();
        category.setCid(categoryId);
        Set<Quiz> allQuizesByCategory = this.quizService.getAllQuizesByCategory(category);
        return new ResponseEntity<>(allQuizesByCategory, HttpStatus.OK);
    }

    // delete quiz
    @DeleteMapping("/deleteQuiz/{quizId}")
    public void deleteQuiz(@PathVariable("quizId") Long quizId){
        this.quizService.deleteQuiz(quizId);
    }

    @GetMapping("/getAllActiveQuizes")
    public ResponseEntity<?> getAllActiveQuizes() {
        Set<Quiz> allActiveQuizes = this.quizService.getAllActiveQuizes();
        return new ResponseEntity<>(allActiveQuizes, HttpStatus.OK);
    }

    @GetMapping("getAllActiveQuizesOfCategory/{categoryId}")
    public ResponseEntity<?> getAllActiveQuizesOfCategory(@PathVariable("categoryId") Long categoryId) {
        Category category = new Category();
        category.setCid(categoryId);
        Set<Quiz> allActiveQuizesOfCategory = this.quizService.getAllActiveQuizesOfCategory(category);
        return new ResponseEntity<>(allActiveQuizesOfCategory, HttpStatus.OK);
    }
}
