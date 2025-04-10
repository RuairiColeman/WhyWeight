package com.whyweight.whyweight.progressLog;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/progress")
public class ProgressLogController {

    private final ProgressLogService progressLogService;

    public ProgressLogController(ProgressLogService progressLogService) {
        this.progressLogService = progressLogService;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ProgressLog createProgressLog(@RequestBody ProgressLog currentWeight, HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        if (userId == null) {
            throw new IllegalStateException("User ID is missing from the request.");
        }
        return progressLogService.createLog(userId, currentWeight.getCurrentWeight());
    }

    @GetMapping
    public List<ProgressLog> getProgressLogs(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        return progressLogService.findAllByUserId(userId);
    }
}