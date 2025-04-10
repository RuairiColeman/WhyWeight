package com.whyweight.whyweight.progressLog;

import com.whyweight.whyweight.SequenceGenerator.SequenceGeneratorService;
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

    public ProgressLog createLog(Integer userId, double currentWeight) {
        ProgressLog log = new ProgressLog();
        log.setId(sequenceGeneratorService.generateSequence(ProgressLog.SEQUENCE_NAME));
        log.setDate(LocalDate.now());
        log.setCurrentWeight(currentWeight);
        log.setUserId(userId);

        // Check if this is the first log for the user
        List<ProgressLog> logs = progressLogRepository.findByUserIdOrderByDateDesc(userId);
        if (logs.isEmpty()) {
            log.setOriginalWeight(currentWeight);
            log.setPreviousWeight(null); // No previous weight for the first log
        } else {
            log.setOriginalWeight(logs.get(0).getOriginalWeight());
            log.setPreviousWeight(logs.get(0).getCurrentWeight());
        }

        return progressLogRepository.save(log);
    }

    public List<ProgressLog> findAllByUserId(Integer userId) {
        return progressLogRepository.findByUserIdOrderByDateDesc(userId);
    }
}