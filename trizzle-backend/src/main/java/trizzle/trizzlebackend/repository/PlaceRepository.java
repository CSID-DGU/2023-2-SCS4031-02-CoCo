package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trizzle.trizzlebackend.domain.Place;

@Repository
public interface PlaceRepository extends MongoRepository<Place, String> {

}
