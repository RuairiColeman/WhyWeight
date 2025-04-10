package com.whyweight.whyweight.progressLog;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "progressLog")
public class ProgressLog {
    @Id
    private Integer id;
    private LocalDate date;
    private double currentWeight;
    private Double previousWeight; // Nullable for the first entry
    private double originalWeight; // First logged weight
    private Integer userId;

    @Transient
    public static final String SEQUENCE_NAME = "progress_sequence";

    // Getters and setters
    public Integer getId() {
        return id;
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

    public double getCurrentWeight() {
        return currentWeight;
    }

    public void setCurrentWeight(double currentWeight) {
        this.currentWeight = currentWeight;
    }

    public Double getPreviousWeight() {
        return previousWeight;
    }

    public void setPreviousWeight(Double previousWeight) {
        this.previousWeight = previousWeight;
    }

    public double getOriginalWeight() {
        return originalWeight;
    }

    public void setOriginalWeight(double originalWeight) {
        this.originalWeight = originalWeight;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}