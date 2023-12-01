package trizzle.trizzlebackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trizzle.trizzlebackend.Utils.JwtUtil;
import trizzle.trizzlebackend.domain.Plan;
import trizzle.trizzlebackend.service.PlanService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanService planService;
    @Value("${jwt.secret}")
    private String secretKey;

    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @PostMapping("")
    public ResponseEntity createPlans(@RequestBody Plan plan, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        String planId = planService.insertPlan(plan, accountId).getId(); // plan 저장할 때 user의 acount_id도 저장,   plan_id 값 반환
        Map<String, String> response = new HashMap<>();
        response.put("message", "save success");
        response.put("planId",planId);
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/{planId}")
    public Plan searchPlan(@PathVariable("planId") String id) {
        return planService.searchPlan(id);
    }

    @PutMapping("/{planId}")
    public ResponseEntity updatePlan(@RequestBody Plan plan, @PathVariable("planId") String id, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);  // token에서 account_id 가져오기

        String planId = planService.updatePlan(plan, id, accountId).getId();
        Map<String, String> response = new HashMap<>();
        response.put("message", "save success");
        response.put("planId",planId);
        return ResponseEntity.ok()
                .body(response);
    }

    @GetMapping("/myplans") //내 일정 불러오기
    public ResponseEntity getMyPlans(HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);

        List<Plan> myPlans = planService.findMyPlans(accountId);
        return ResponseEntity.ok()
                .body(myPlans);
    }

    @GetMapping("/myplans/nonpost")
    public ResponseEntity getMyandNotPostPlan(@RequestParam(value = "region", required = false) String region,HttpServletRequest request){
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        List<Plan> plans = new ArrayList<>();
        if(region == null) plans = planService.findMyNotPostPlan(accountId);
        else plans = planService.findMyPlanByLocation(accountId, region);

        return ResponseEntity.ok().body(plans);
    }

    @DeleteMapping("/myplans/{planId}") // 일정 삭제하기
    public ResponseEntity deleteMyPlan(@PathVariable("planId") String planId, HttpServletRequest request) {
        String token = JwtUtil.getAccessTokenFromCookie(request);
        String accountId = JwtUtil.getAccountId(token, secretKey);
        Plan plan = planService.searchPlan(planId);

        if (plan.getAccountId().equals(accountId)) {
            planService.deletePlan(planId);
            String message = "delete success";
            List<Plan> myPlans = planService.findMyPlans(accountId);

            Map<String, Object> response = new HashMap<>();
            response.put("message", message);
            response.put("myplans", myPlans);

            return ResponseEntity.ok()
                    .body(response);
        } else {
            String message = "wrong approach";
            return ResponseEntity.ok()
                    .body("{\"message\": \"" + message + "\"}");
        }

    }
}
