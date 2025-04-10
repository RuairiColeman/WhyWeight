package com.whyweight.whyweight.user;

import com.whyweight.whyweight.SequenceGenerator.SequenceGeneratorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    public UserService(UserRepository userRepository, SequenceGeneratorService sequenceGeneratorService) {
        this.userRepository = userRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(String id) {
        return userRepository.findById(id).orElseThrow();
    }

    public User create(User user) {
        user.setId(sequenceGeneratorService.generateSequence(User.SEQUENCE_NAME));
        return userRepository.save(user);
    }

    public void delete(String id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByUsernameAndPassword(String username, String password) {
        return userRepository.findAll()
                .stream()
                .filter(user -> user.getUsername().equals(username) && user.getPassword().equals(password))
                .findFirst();
    }
}