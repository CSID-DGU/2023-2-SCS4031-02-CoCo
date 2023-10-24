package trizzle.trizzlebackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Service;
import trizzle.trizzlebackend.domain.Day;
import trizzle.trizzlebackend.domain.Place;
import trizzle.trizzlebackend.domain.Plan;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class PlanService {

    private final MongoRepository<Plan, String> mongoRepository;
    private final PlaceService placeService;

    @Autowired
    public PlanService(MongoRepository<Plan, String> mongoRepository, PlaceService placeService){
        this.mongoRepository = mongoRepository;
        this.placeService = placeService;
    }


    // plan 저장하는 메소드
    public Plan insertPlan(Plan plan){
        LocalDateTime dateTime = LocalDateTime.now();   
        plan.setPlan_registration_date(dateTime);   // 일정 등록 시 현재시간을 등록시간으로 저장
        
        HashSet<Place> places = new HashSet<>();    // plan내의 place들을 중복되지 않게 저장

        for(Day day: plan.getContent()){    // content의 날짜(day)에 따라
            for(Place place: day.getPlace_list()) { // place 항목을 확인
                if(place.getPlace_id() != null) {   // place_id가 null이 아니면(즉 keyword가 아닌 place정보 왔다면) place정보 저장
                    if(!places.contains(place)){  // plan 내의 place 중복되는 지 확인(place 중복 저장 막기 위해)
                        places.add(place);
                    }
                    }
                }
            }

        for (Place place : places) {
            Optional<Place> existingPlace = placeService.findByPlaceId(place.getPlace_id());      // place 중복 저장 막기 위해 저장되어 있는지 확인

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

}
