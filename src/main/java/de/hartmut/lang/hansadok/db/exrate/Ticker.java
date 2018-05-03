package de.hartmut.lang.hansadok.db.exrate;

import com.fasterxml.jackson.annotation.JsonGetter;
import org.bson.types.Decimal128;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;


/**
 * hartmut on 28.04.18.
 */
@Document
public class Ticker {
    @Id
    private String id;

    private Instant timestamp;
    private String pairName;
    private Decimal128 averageToday;
    private Decimal128 average24h;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public String getPairName() {
        return pairName;
    }

    public void setPairName(String pairName) {
        this.pairName = pairName;
    }

    public Decimal128 getAverageToday() {
        return averageToday;
    }

    public void setAverageToday(Decimal128 averageToday) {
        this.averageToday = averageToday;
    }

    @JsonGetter("averageToday")
    public String getAverageTodayStr() {
        return averageToday.toString();
    }

    public Decimal128 getAverage24h() {
        return average24h;
    }

    public void setAverage24h(Decimal128 average24h) {
        this.average24h = average24h;
    }

    @JsonGetter("average24h")
    public String getAverage24hStr() {
        return average24h.toString();
    }

    @Override
    public String toString() {
        return "Ticker{" +
                "id='" + id + '\'' +
                ", timestamp=" + timestamp +
                ", pairName='" + pairName + '\'' +
                ", averageToday=" + averageToday +
                ", average24h=" + average24h +
                '}';
    }
}
