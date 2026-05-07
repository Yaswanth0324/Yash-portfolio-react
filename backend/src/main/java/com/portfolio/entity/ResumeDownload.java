package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resume_downloads")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeDownload {

    @Id
    private Long id;  // Always 1 (singleton row)

    @Column(nullable = false)
    private Long count;
}
