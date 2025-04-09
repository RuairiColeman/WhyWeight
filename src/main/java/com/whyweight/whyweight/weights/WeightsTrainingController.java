package com.whyweight.whyweight.weights;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class WeightsTrainingController {

    private final WeightsTrainingService weightsTrainingService;

    public WeightsTrainingController(WeightsTrainingService weightsTrainingService) {
        this.weightsTrainingService = weightsTrainingService;
    }


    @GetMapping("/weights")
    public List<WeightsTraining> getWeights(HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        return weightsTrainingService.findAllByUserId(userId);
    }

    @GetMapping("/weights/{id}")
    WeightsTraining findById(@PathVariable Integer id) {
        return weightsTrainingService.findById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/weights")
    WeightsTraining createWeights(@RequestBody WeightsTraining weightsTraining, HttpServletRequest request) {
        Integer userId = (Integer) request.getAttribute("userId");
        if (userId == null) {
            throw new IllegalStateException("User ID is missing from the request.");
        }
        weightsTraining.setUserId(userId);
        return weightsTrainingService.create(weightsTraining);
    }

//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    @PutMapping("weights/{id}")
//    public void update (@RequestBody WeightsTraining weightsTraining, @PathVariable Integer id) {
//        weightsTrainingService.update(weightsTraining, id);
//    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("weights/{id}")
    public void delete(@PathVariable Integer id) {
        weightsTrainingService.delete(id);
    }
}
