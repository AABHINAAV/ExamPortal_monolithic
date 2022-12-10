package com.exam.services.impl;

import com.exam.models.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.LinkedHashSet;
import java.util.Set;

public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Set<Category> getAllCategories() {
        return new LinkedHashSet<>(this.categoryRepository.findAll());
    }

    @Override
    public Category getCategory(Long categoryId) {
        return this.categoryRepository.findById(categoryId).get();
    }

    @Override
    public void deleteCategory(Long categoryId) {
//        Category category = new Category();
//        category.setCid(categoryId);
//        this.categoryRepository.delete(category);

        this.categoryRepository.deleteById(categoryId);
    }
}
