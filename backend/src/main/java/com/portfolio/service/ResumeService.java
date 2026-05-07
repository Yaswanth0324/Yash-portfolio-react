package com.portfolio.service;

import com.portfolio.entity.ResumeDownload;
import com.portfolio.repository.ResumeDownloadRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private static final long SINGLETON_ID = 1L;
    private final ResumeDownloadRepository repository;

    @Transactional
    public long increment() {
        ResumeDownload rd = repository.findById(SINGLETON_ID)
                .orElse(ResumeDownload.builder().id(SINGLETON_ID).count(0L).build());
        rd.setCount(rd.getCount() + 1);
        return repository.save(rd).getCount();
    }

    public long getCount() {
        return repository.findById(SINGLETON_ID)
                .map(ResumeDownload::getCount)
                .orElse(0L);
    }
}
