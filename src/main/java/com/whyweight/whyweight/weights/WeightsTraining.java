package com.whyweight.whyweight.weights;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "weights")
public class WeightsTraining {
    @Id
    private Integer id;

    private LocalDate date;
    private String exercise;
    private int sets;
    private int reps;
    private double weight;

    private Integer userId;



    @Transient
    public static final String SEQUENCE_NAME = "weights_sequence";

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getId() { return id; }

    public LocalDate getDate() {
        return date;
    }

    public String getExercise() {
        return exercise;
    }

    public int getSets() {
        return sets;
    }

    public int getReps() {
        return reps;
    }

    public double getWeight() {
        return weight;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    public void setExercise(String exercise) {
        this.exercise = exercise;
    }
    
    public void setSets(int sets) {
        this.sets = sets;
    }
    
    public void setReps(int reps) {
        this.reps = reps;
    }
    
    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String toString() {
        return "Id: " + id +
                "Date: " + date + ", " +
                "Exercise: " + exercise + ", " +
                "Sets: " + sets + ", " +
                "Reps: " + reps + ", " +
                "Weight: " + weight;
    }
}
