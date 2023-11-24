package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Inquiry;

import java.util.List;

public interface InquiryRepository extends MongoRepository<Inquiry, Long> {
    List<Inquiry> findByResponseIsNotNull();
}
