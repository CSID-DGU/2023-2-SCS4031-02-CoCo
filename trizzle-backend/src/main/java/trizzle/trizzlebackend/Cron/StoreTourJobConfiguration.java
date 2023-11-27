package trizzle.trizzlebackend.Cron;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import trizzle.trizzlebackend.controller.FestivalController;

@Component
@RequiredArgsConstructor
public class StoreTourJobConfiguration {
    Logger log = LoggerFactory.getLogger(this.getClass());
    private final FestivalController festivalController;

    @Scheduled(cron = "0 0 0 * * *")
    public void tourSchedule() {
        String delete = festivalController.deleteAll();
        if(delete.equals("success")) {
            String save = festivalController.saveFestivals();
            if(save.equals("success")){
                festivalController.updateHomepage();
            }
        }
        log.info("change");
    }

}
