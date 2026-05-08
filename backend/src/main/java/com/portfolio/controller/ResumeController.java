package com.portfolio.controller;

import com.portfolio.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/download")
    public ResponseEntity<Map<String, Long>> incrementDownload() {
        long count = resumeService.increment();
        return ResponseEntity.ok(Map.of("count", count));
    }

    @GetMapping("/download/count")
    public ResponseEntity<Long> getDownloadCount() {
        return ResponseEntity.ok(resumeService.getCount());
    }
}
