package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "visitor_count")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitorCount {

    @Id
    private Long id;  // Always 1 (singleton row)

    @Column(nullable = false)
    private Long count;
}
