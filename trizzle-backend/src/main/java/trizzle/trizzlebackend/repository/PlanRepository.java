package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trizzle.trizzlebackend.domain.Plan;

@Repository
public interface PlanRepository extends MongoRepository<Plan, String> {

}
