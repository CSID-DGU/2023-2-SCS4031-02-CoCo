package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Plan;
import trizzle.trizzlebackend.service.PlanService;

@RestController
@RequestMapping("/plans")
public class PlanController {

    private final PlanService planService;
    @Value("${jwt.secret}")
    private String secretKey;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @PostMapping("")
    public ResponseEntity<String> createPlans(@RequestBody Plan plan, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        planService.insertPlan(plan, accountId); // plan 저장할 때 user의 acount_id도 저장
        return new ResponseEntity<>("{\"message\":\"success\"}", HttpStatus.OK);
    }

    @GetMapping("/{plan_id}")
    public Plan searchPlan(@PathVariable("plan_id") String id) {
        return planService.searchPlan(id);
    }

    @PutMapping("/{plan_id}")
    public ResponseEntity<String> updatePlan(@RequestBody Plan plan, @PathVariable("plan_id") String id, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        planService.updatePlan(plan, id, accountId);
        return new ResponseEntity<>("{\"message\":\"success\"}", HttpStatus.OK);
    }
}
