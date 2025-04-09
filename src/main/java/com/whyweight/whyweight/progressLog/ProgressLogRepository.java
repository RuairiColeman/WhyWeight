package com.whyweight.whyweight.progressLog;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@Repository


public interface ProgressLogRepository extends MongoRepository<ProgressLog, String> {
    @Query("{ 'userId': ?0 }")
    List<ProgressLog> findByUserIdOrderByDateDesc(Integer userId);
}
