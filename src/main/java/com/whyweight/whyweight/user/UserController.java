package com.whyweight.whyweight.user;

import com.whyweight.whyweight.LoginRequest;
import com.whyweight.whyweight.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.findByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        if (user.isPresent()) {
            String token = jwtUtil.generateToken(user.get().getId());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @GetMapping("/users")
    List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/users/{id}")
    User getUserById(@PathVariable String id) {
        return userService.findById(id);
    }

    @PostMapping("/users")
    User createUser(@RequestBody User user) {
        System.out.println("Received user: " + user);
        return userService.create(user);
    }

    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable String id) {
        userService.delete(id);
    }
}


