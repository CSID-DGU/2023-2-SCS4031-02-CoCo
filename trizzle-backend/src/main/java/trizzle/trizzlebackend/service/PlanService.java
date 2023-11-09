package trizzle.trizzlebackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Day;
import trizzle.trizzlebackend.domain.Place;
import trizzle.trizzlebackend.domain.Plan;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final MongoRepository<Plan, String> mongoRepository;
    private final PlaceService placeService;
    private final MongoTemplate mongoTemplate;


    // plan 저장하는 메소드
    public Plan insertPlan(Plan plan, String accountId){
        plan.setAccountId(accountId);  // plan에 account_id도 저장
        LocalDateTime dateTime = LocalDateTime.now();   
        plan.setPlanRegistrationDate(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장
        
        HashSet<Place> places = new HashSet<>();    // plan내의 place들을 중복되지 않게 저장

        for(Day day: plan.getContent()){    // content의 날짜(day)에 따라
            for(Place place: day.getPlaceList()) { // place 항목을 확인
                if(place.getPlaceId() != null) {   // place_id가 null이 아니면(즉 keyword가 아닌 place정보 왔다면) place정보 저장
                    if(!places.contains(place)){  // plan 내의 place 중복되는 지 확인(place 중복 저장 막기 위해)
                        places.add(place);
                    }
                    }
                }
            }

        for (Place place : places) {
            Optional<Place> existingPlace = placeService.findByPlaceId(place.getPlaceId());      // place 중복 저장 막기 위해 저장되어 있는지 확인

            if(!existingPlace.isPresent()) {    // 존재하지 않을 경우
                placeService.savePlace(place);
            }
        }

        return mongoRepository.save(plan);
    }

    /*일정 가져오기*/
    public Plan searchPlan(String _id) {
        Optional <Plan> planOptional = mongoRepository.findById(_id);
        return planOptional.orElse(null);
    }

    /*일정 수정하기*/
    public Plan updatePlan(Plan plan, String id, String acccountId){
        plan.setId(id);
        return insertPlan(plan, acccountId);    // insertPlan 재활용할지 아니면 insertPlan에서는 insert, 여기서는 save사용할지
    }

    public List<Plan> findMyPlans(String accountId) {
        Query query = new Query(Criteria.where("accountId").is(accountId));
        List<Plan> myPlans = mongoTemplate.find(query, Plan.class);
        return myPlans;
    }

    public void deletePlan(String planId) {
        mongoRepository.deleteById(planId);
    }
}
