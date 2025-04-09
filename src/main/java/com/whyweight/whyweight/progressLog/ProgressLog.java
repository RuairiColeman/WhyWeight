package com.whyweight.whyweight.progressLog;

import com.whyweight.whyweight.SequenceGenerator.SequenceGeneratorService;
import com.whyweight.whyweight.user.User;
import jakarta.annotation.PostConstruct;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "progressLog")
public class ProgressLog {
    @Id
    private Integer id;
    private LocalDate date;
    private int currentWeight;
    private int previousWeight;

    private Integer userId;
    //private int bodyFat;
    //private int muscleMass;


    SequenceGeneratorService sequenceGeneratorService;

    @Transient
    public static final String SEQUENCE_NAME = "users_sequence";

    @PostConstruct
    public void generateId() {
        this.id = sequenceGeneratorService.generateSequence(SEQUENCE_NAME);
    }

    public Integer getId() {
        return id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getCurrentWeight() {
        return currentWeight;
    }

    public void setCurrentWeight(int currentWeight) {
        this.currentWeight = currentWeight;
    }

    public int getPreviousWeight() {
        return previousWeight;
    }

    public void setPreviousWeight(int previousWeight) {
        this.previousWeight = previousWeight;
    }

    public int getTrendWeight() {
        return currentWeight - previousWeight;
    }
}
