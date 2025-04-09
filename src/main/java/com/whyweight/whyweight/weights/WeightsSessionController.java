package com.whyweight.whyweight.weights;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sessions")
public class WeightsSessionController {

    private final WeightsSessionService weightsSessionService;

    public WeightsSessionController(WeightsSessionService weightsSessionService) {
        this.weightsSessionService = weightsSessionService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public WeightsSession createSession(@RequestBody Map<String, String> requestBody, HttpServletRequest request) {
        String title = requestBody.get("title");
        if (title == null || title.isEmpty()) {
            throw new IllegalArgumentException("Title is required.");
        }
        Integer userId = (Integer) request.getAttribute("userId");
        if (userId == null) {
            throw new IllegalStateException("User ID is missing from the request.");
        }
        return weightsSessionService.createSession(title, userId);
    }

    @ResponseStatus(HttpStatus.OK)
    @PostMapping("/{sessionId}/exercises")
    public WeightsSession addWorkoutToSession(@PathVariable Integer sessionId, @RequestBody WeightsTraining workout) {
        return weightsSessionService.addWorkoutToSession(sessionId, workout);
    }

    @GetMapping
    public List<WeightsSession> getSessions(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        return weightsSessionService.findAllByUserId(userId);
    }

    @GetMapping("/{sessionId}")
    public List<WeightsTraining> getSessionsById(@PathVariable Integer sessionId, HttpServletRequest request) {
        //Integer userId = (Integer) request.getAttribute("userId");
        return weightsSessionService.findAllWorkoutsBySessionId(sessionId);
    }
}