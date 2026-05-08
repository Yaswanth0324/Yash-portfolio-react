package com.portfolio.controller;

import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<Map<String, String>> submitContact(@Valid @RequestBody ContactRequest req) {
        contactService.saveContact(req.getName(), req.getEmail(), req.getMessage());
        return ResponseEntity.ok(Map.of("status", "success", "message", "Message received!"));
    }

    @Data
    public static class ContactRequest {
        @NotBlank(message = "Name is required")
        @Size(min = 2, max = 100)
        private String name;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Message is required")
        @Size(min = 10, max = 2000)
        private String message;
    }
}
