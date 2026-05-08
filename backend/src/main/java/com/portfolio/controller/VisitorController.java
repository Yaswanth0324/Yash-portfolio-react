package com.portfolio.controller;

import com.portfolio.service.VisitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/visit")
@RequiredArgsConstructor
public class VisitorController {

    private final VisitorService visitorService;

    @PostMapping
    public ResponseEntity<Map<String, Long>> incrementVisitor() {
        long count = visitorService.increment();
        return ResponseEntity.ok(Map.of("count", count));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getVisitorCount() {
        return ResponseEntity.ok(visitorService.getCount());
    }
}
