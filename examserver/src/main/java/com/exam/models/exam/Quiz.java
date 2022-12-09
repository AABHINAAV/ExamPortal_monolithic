package com.exam.models.exam;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "quiz")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long qID;

    private String title;
    private String description;
    private String totalQuestion;
    private String maxMarks;
    private String minMarks;
    private boolean isActive = false;

    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "quiz")
    @JsonIgnore
    private Set<Question> questions = new LinkedHashSet<>();

    public Quiz() {
    }

    public Quiz(Long qID, String title, String description, String totalQuestion, String maxMarks, String minMarks, boolean isActive, Category category, Set<Question> questions) {
        this.qID = qID;
        this.title = title;
        this.description = description;
        this.totalQuestion = totalQuestion;
        this.maxMarks = maxMarks;
        this.minMarks = minMarks;
        this.isActive = isActive;
        this.category = category;
        this.questions = questions;
    }

    public Long getqID() {
        return qID;
    }

    public void setqID(Long qID) {
        this.qID = qID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTotalQuestion() {
        return totalQuestion;
    }

    public void setTotalQuestion(String totalQuestion) {
        this.totalQuestion = totalQuestion;
    }

    public String getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(String maxMarks) {
        this.maxMarks = maxMarks;
    }

    public String getMinMarks() {
        return minMarks;
    }

    public void setMinMarks(String minMarks) {
        this.minMarks = minMarks;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
}
