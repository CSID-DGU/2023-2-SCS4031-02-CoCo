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

import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity createPlans(@RequestBody Plan plan, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        String plan_id = planService.insertPlan(plan, accountId).getId(); // plan 저장할 때 user의 acount_id도 저장,   plan_id 값 반환
        Map<String, String> response = new HashMap<>();
        response.put("message", "save success");
        response.put("plan_id",plan_id);
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/{plan_id}")
    public Plan searchPlan(@PathVariable("plan_id") String id) {
        return planService.searchPlan(id);
    }

    @PutMapping("/{plan_id}")
    public ResponseEntity updatePlan(@RequestBody Plan plan, @PathVariable("plan_id") String id, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        String token =authorization.split(" ")[1];
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        String plan_id = planService.updatePlan(plan, id, accountId).getId();
        Map<String, String> response = new HashMap<>();
        response.put("message", "save success");
        response.put("plan_id",plan_id);
        return ResponseEntity.ok()
                .body(response);
    }
}
