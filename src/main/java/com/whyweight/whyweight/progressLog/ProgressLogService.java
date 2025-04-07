package com.whyweight.whyweight.progressLog;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressLogService {

    private final ProgressLogRepository progressLogRepository;

    public ProgressLogService(ProgressLogRepository progressLogRepository) {
        this.progressLogRepository = progressLogRepository;
    }

    public List<ProgressLog> findAll() {
        return progressLogRepository.findAll();
    }

    public ProgressLog findById(String id) {
        return progressLogRepository.findById(id).orElseThrow();
    }

    public ProgressLog create(ProgressLog progressLog) {
        return progressLogRepository.save(progressLog);
    }

//    public ProgressLog update(ProgressLog progressLog) {
//        return progressLogRepository.save(progressLog);
//    }

    public void delete(String id) {
        progressLogRepository.deleteById(id);
    }
}
