package com.whyweight.whyweight.weights;

import com.whyweight.whyweight.SequenceGenerator.SequenceGeneratorService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WeightsTrainingService {

    private final WeightsTrainingRepository weightsTrainingRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    public WeightsTrainingService(WeightsTrainingRepository weightsTrainingRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.weightsTrainingRepository = weightsTrainingRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public List<WeightsTraining> findAllByUserId(Integer userId) {
        return weightsTrainingRepository.findAll()
                .stream()
                .filter(weights -> weights.getUserId().equals(userId))
                .toList();
    }

    public WeightsTraining findById(Integer id) {
        return weightsTrainingRepository.findById(id).orElseThrow();
    }

    public WeightsTraining create(WeightsTraining weightsTraining) {
        weightsTraining.setId(sequenceGeneratorService.generateSequence(WeightsTraining.SEQUENCE_NAME));
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
