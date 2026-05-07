package com.portfolio.service;

import com.portfolio.entity.Contact;
import com.portfolio.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public Contact saveContact(String name, String email, String message) {
        Contact contact = Contact.builder()
                .name(name.trim())
                .email(email.trim().toLowerCase())
                .message(message.trim())
                .build();
        return contactRepository.save(contact);
    }
}
