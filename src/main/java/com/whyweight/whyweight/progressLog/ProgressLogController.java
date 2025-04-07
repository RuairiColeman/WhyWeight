package com.whyweight.whyweight.progressLog;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProgressLogController {
    private final ProgressLogService progressLogService;
    private final ProgressLog progressLog;

    public ProgressLogController(ProgressLogService progressLogService) {
        this.progressLogService = progressLogService;
        this.progressLog = new ProgressLog();

    }

    // Add methods to handle HTTP requests for progress logs
    @GetMapping("/progress")
    List<ProgressLog> getAllProgressLogs() {
        progressLog.getTrendWeight();
        return progressLogService.findAll();
    }

    @GetMapping("/progress/{id}")
    ProgressLog getProgressLogById(@PathVariable String id) {
        return progressLogService.findById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/progress")
    ProgressLog createProgressLog(@RequestBody ProgressLog progressLog) {
        return progressLogService.create(progressLog);
    }

    @DeleteMapping ("/progress/{id}")
    void deleteProgressLog(@PathVariable String id) {
        progressLogService.delete(id);
    }
}
