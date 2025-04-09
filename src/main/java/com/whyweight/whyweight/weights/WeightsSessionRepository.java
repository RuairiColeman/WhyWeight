package com.whyweight.whyweight.weights;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeightsSessionRepository extends MongoRepository<WeightsSession, Integer> {
}