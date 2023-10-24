package trizzle.trizzlebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.domain.Plan;
import trizzle.trizzlebackend.service.PlanService;

@RestController
@RequestMapping("/plans")
public class PlanController {

    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @PostMapping("")
    public ResponseEntity<String> createPlans(@RequestBody Plan plan) {
        planService.insertPlan(plan);
        return new ResponseEntity<>("{\"message\":\"success\"}", HttpStatus.OK);
    }
    
}
