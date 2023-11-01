package trizzle.trizzlebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import trizzle.trizzlebackend.domain.Plan;

import java.util.List;

@RestController
public class TestController {


    private final MongoRepository<Plan, String> mongoRepository;
    @Autowired
    public TestController(MongoRepository<Plan, String> mongoRepository) {
        this.mongoRepository = mongoRepository;
    }

    @GetMapping("/")
    public String helloWorld() {
        return "hello World";
    }

    @GetMapping("/getPlans")
    public ResponseEntity getPlans() {
        List<Plan> plans = mongoRepository.findAll();
        return ResponseEntity.ok()
                .body(plans);
    }
}
