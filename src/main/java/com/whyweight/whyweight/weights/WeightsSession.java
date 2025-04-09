package com.whyweight.whyweight.weights;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "sessions")
public class WeightsSession {
    @Id
    private Integer id;

    private String title;
    private Integer userId;

    private List<WeightsTraining> workouts = new ArrayList<>();

    @Transient
    public static final String SEQUENCE_NAME = "sessions_sequence";

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public List<WeightsTraining> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<WeightsTraining> workouts) {
        this.workouts = workouts;
    }

    public void addWorkout(WeightsTraining workout) {
        this.workouts.add(workout);
    }
}