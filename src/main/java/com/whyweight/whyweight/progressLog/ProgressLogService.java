package com.whyweight.whyweight.progressLog;

import com.whyweight.whyweight.SequenceGenerator.SequenceGeneratorService;
import com.whyweight.whyweight.weights.WeightsSession;
import com.whyweight.whyweight.weights.WeightsTraining;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProgressLogService {

    private final ProgressLogRepository progressLogRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    public ProgressLogService(ProgressLogRepository progressLogRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.progressLogRepository = progressLogRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public List<ProgressLog> findAllByUserId(Integer userId) {
        return progressLogRepository.findAll()
                .stream()
                .filter(progress -> progress.getUserId().equals(userId))
                .toList();
    }

    public ProgressLog createLog(ProgressLog log) {
        // Check if the user has previous logs
        List<ProgressLog> logs = progressLogRepository.findByUserIdOrderByDateDesc(log.getUserId());
        if (!logs.isEmpty()) {
            // Set the previousWeight to the currentWeight of the most recent log
            log.setPreviousWeight(logs.get(0).getCurrentWeight());
        } else {
            // No previous logs, set previousWeight to 0 or leave it unset
            log.setPreviousWeight(0);
        }

        // Generate a new ID for the log
        log.setId(sequenceGeneratorService.generateSequence(ProgressLog.SEQUENCE_NAME));
        return progressLogRepository.save(log);
    }

}
