package com.whyweight.whyweight.progressLog;

import jakarta.servlet.http.HttpServletRequest;
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

    @PostMapping("/progress")
    ProgressLog createProgressLog(@RequestBody ProgressLog progressLog, @RequestHeader("userId") Integer userId) {
        progressLog.setUserId(userId);
        return progressLogService.create(progressLog);
    }

    @GetMapping("/progress")
    List<ProgressLog> getProgressLog(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        return progressLogService.findAllByUserId(userId);
    }

    @GetMapping("/progress/{id}")
    ProgressLog getProgressLogById(@PathVariable String id) {
        return progressLogService.findById(id);
    }


    @DeleteMapping ("/progress/{id}")
    void deleteProgressLog(@PathVariable String id) {
        progressLogService.delete(id);
    }
}
