package com.portfolio.repository;

import com.portfolio.entity.ResumeDownload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeDownloadRepository extends JpaRepository<ResumeDownload, Long> {}
