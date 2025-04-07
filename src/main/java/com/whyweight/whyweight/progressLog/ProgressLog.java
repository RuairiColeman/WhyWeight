package com.whyweight.whyweight.progressLog;

import com.whyweight.whyweight.user.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "progressLog")
public class ProgressLog {
    @Id
    String id;
    private LocalDate date;
    private int currentWeight;
    private int previousWeight;
    @DBRef
    private User user;
    //private int bodyFat;
    //private int muscleMass;


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

    public String getId() {
        return id;
    }

    public void setId(String id) {
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
