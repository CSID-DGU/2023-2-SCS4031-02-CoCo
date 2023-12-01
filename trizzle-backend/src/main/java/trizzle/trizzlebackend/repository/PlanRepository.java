package trizzle.trizzlebackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import trizzle.trizzlebackend.domain.Plan;

import java.util.List;

@Repository
public interface PlanRepository extends MongoRepository<Plan, String> {

    List<Plan> findByAccountIdAndPostIdIsNull(String accountId);
    List<Plan> findByAccountIdAndPlanLocationAndPostIdIsNull(String accountId, String planLocation);

}
