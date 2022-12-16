package com.exam.controller;

import com.exam.models.exam.Category;
import com.exam.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // add category
    @PostMapping("/addCategory")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        Category res = this.categoryService.addCategory(category);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // update category
    @PutMapping("/updateCategory")
    public ResponseEntity<?> updateCategory(@RequestBody Category category){
        Category res = this.categoryService.updateCategory(category);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // get all categories
    @GetMapping("/getAllCategories")
    public ResponseEntity<Set<Category>> getAllCategory(){
        Set<Category> allCategory = this.categoryService.getAllCategories();
        return new ResponseEntity<>(allCategory, HttpStatus.OK);
    }

    // get category
    @GetMapping("/getCategory/{categoryId}")
    public ResponseEntity<?> getCategory(@PathVariable Long categoryId){
        Category res = this.categoryService.getCategory(categoryId);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    // delete category
    @DeleteMapping("/deleteCategory/{categoryId}")
    public void deleteCategory(@PathVariable Long categoryId){
        this.categoryService.deleteCategory(categoryId);
    }
}
