package com.whyweight.whyweight.weights;

import com.whyweight.whyweight.SequenceGenerator.SequenceGeneratorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeightsSessionService {

    private final WeightsSessionRepository weightsSessionRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    public WeightsSessionService(WeightsSessionRepository weightsSessionRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.weightsSessionRepository = weightsSessionRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public WeightsSession createSession(String title, Integer userId) {
        WeightsSession session = new WeightsSession();
        session.setId(sequenceGeneratorService.generateSequence(WeightsSession.SEQUENCE_NAME));
        session.setTitle(title);
        session.setUserId(userId);
        return weightsSessionRepository.save(session);
    }

    public WeightsSession addWorkoutToSession(Integer sessionId, WeightsTraining workout) {
        WeightsSession session = weightsSessionRepository.findById(sessionId).orElseThrow();

        // Generate a unique ID for the workout
        workout.setId(sequenceGeneratorService.generateSequence(WeightsTraining.SEQUENCE_NAME));

        // Set the userId from the session
        workout.setUserId(session.getUserId());

        // Add the workout to the session
        session.addWorkout(workout);

        return weightsSessionRepository.save(session);
    }

    public List<WeightsSession> findAllByUserId(Integer userId) {
        return weightsSessionRepository.findAll()
                .stream()
                .filter(session -> session.getUserId().equals(userId))
                .toList();
    }

    public List<WeightsTraining> findAllWorkoutsBySessionId(Integer sessionId) {
        WeightsSession session = weightsSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session with ID " + sessionId + " not found"));
        return session.getWorkouts();
    }
}