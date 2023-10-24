package trizzle.trizzlebackend.domain;

import java.util.List;

public class Day {
    private int day;
    private List<Place> place_list;

    public List<Place> getPlace_list() {
        return place_list;
    }

    public void setPlace_list(List<Place> place_list) {
        this.place_list = place_list;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }
}
