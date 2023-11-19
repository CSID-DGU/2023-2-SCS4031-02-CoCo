package trizzle.trizzlebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Place;
import trizzle.trizzlebackend.repository.PlaceRepository;

import java.util.Optional;

@Service
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public PlaceService(PlaceRepository placeRepository, MongoTemplate mongoTemplate) {
        this.placeRepository = placeRepository;
        this.mongoTemplate = mongoTemplate;
    }


    public Place savePlace(Place place) {
        return placeRepository.save(place);
    }

    public Optional<Place> findByPlaceId(String placeId) {
        Query query = new Query(Criteria.where("id").is(placeId));
        Place place = mongoTemplate.findOne(query, Place.class);
        return Optional.ofNullable(place);
    }
}
