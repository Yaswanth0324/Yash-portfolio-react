package com.portfolio.service;

import com.portfolio.entity.VisitorCount;
import com.portfolio.repository.VisitorCountRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VisitorService {

    private static final long SINGLETON_ID = 1L;
    private final VisitorCountRepository repository;

    @Transactional
    public long increment() {
        VisitorCount vc = repository.findById(SINGLETON_ID)
                .orElse(VisitorCount.builder().id(SINGLETON_ID).count(0L).build());
        vc.setCount(vc.getCount() + 1);
        return repository.save(vc).getCount();
    }

    public long getCount() {
        return repository.findById(SINGLETON_ID)
                .map(VisitorCount::getCount)
                .orElse(0L);
    }
}
