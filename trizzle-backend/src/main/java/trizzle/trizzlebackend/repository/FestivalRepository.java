package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import trizzle.trizzlebackend.domain.Festival;

import java.util.List;

public interface FestivalRepository extends MongoRepository<Festival, Long> {
    Festival findByContentId(String contentId);
    List<Festival> findByContentIdIsNotNull();
}
