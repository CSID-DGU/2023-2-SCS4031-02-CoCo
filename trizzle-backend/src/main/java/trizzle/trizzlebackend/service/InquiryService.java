package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Inquiry;
import trizzle.trizzlebackend.repository.InquiryRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryService {
    private final InquiryRepository inquiryRepository;

    public Inquiry insertInquiry(Inquiry inquiry) {

        return inquiryRepository.save(inquiry);
    }

    public List<Inquiry> findAllInquiry() {
        return inquiryRepository.findByResponseIsNotNull();

    }

}
