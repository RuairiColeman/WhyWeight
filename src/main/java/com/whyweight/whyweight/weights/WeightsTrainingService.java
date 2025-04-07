package com.whyweight.whyweight.weights;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeightsTrainingService {

    private final WeightsTrainingRepository weightsTrainingRepository;

    public WeightsTrainingService(WeightsTrainingRepository weightsTrainingRepository) {
        this.weightsTrainingRepository = weightsTrainingRepository;
    }

    public List<WeightsTraining> findAll() {
        return weightsTrainingRepository.findAll();
    }

    public WeightsTraining findById(Integer id) {
        return weightsTrainingRepository.findById(id).orElseThrow();
    }

    public WeightsTraining create(WeightsTraining weightsTraining) {
        return weightsTrainingRepository.save(weightsTraining);
    }
//
//    public void update(WeightsTraining weightsTraining, Integer id) {
//        weightsTrainingRepository.update(weightsTraining, id);
//    }

    public void delete(Integer id) {
        weightsTrainingRepository.deleteById(id);
    }
}
