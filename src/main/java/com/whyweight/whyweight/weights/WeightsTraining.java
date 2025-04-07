package com.whyweight.whyweight.weights;

import com.whyweight.whyweight.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "weights")
public class WeightsTraining {
    @Id
    Integer id;

    private LocalDate date;
    private String exercise;
    private int sets;
    private int reps;
    private double weight;
    @DBRef
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setUserId(String userId) {
        this.user.setId(userId);
    }

    public String getUserId() {
        return user.getId();
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
