package com.whyweight.whyweight.progressLog;

import com.whyweight.whyweight.weights.WeightsSession;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ProgressLogController {
    private final ProgressLogService progressLogService;
    private final ProgressLog progressLog;

    public ProgressLogController(ProgressLogService progressLogService) {
        this.progressLogService = progressLogService;
        this.progressLog = new ProgressLog();

    }

    @PostMapping("/progress")
    ProgressLog createProgressLog(@RequestBody ProgressLog progressLog, HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        if (userId == null) {
            throw new IllegalStateException("User ID is missing from the request.");
        }
        progressLog.setUserId(userId);
        return progressLogService.createLog(progressLog);
    }

    @GetMapping("/progress")
    List<ProgressLog> getProgressLog(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        return progressLogService.findAllByUserId(userId);
    }

//    @GetMapping("/progress/{id}")
//    ProgressLog getProgressLogById(@PathVariable Integer id) {
//        return progressLogService.;
//    }


//    @DeleteMapping ("/progress/{id}")
//    void deleteProgressLog(@PathVariable Integer id) {
//        progressLogService.delete(id);
//    }
}
