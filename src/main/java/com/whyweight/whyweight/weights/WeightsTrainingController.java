package com.whyweight.whyweight.weights;

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
    List<WeightsTraining> findAll() {
        return weightsTrainingService.findAll();
    }

    @GetMapping("/weights/{id}")
    WeightsTraining findById(@PathVariable Integer id) {
        return weightsTrainingService.findById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/weights")
    WeightsTraining create(@RequestBody WeightsTraining weightsTraining) {
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
