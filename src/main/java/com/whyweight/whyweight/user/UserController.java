package com.whyweight.whyweight.user;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
        return userService.create(user);
    }

    @DeleteMapping("/users/{id}")
    void deleteUser(@PathVariable String id) {
        userService.delete(id);
    }
}


