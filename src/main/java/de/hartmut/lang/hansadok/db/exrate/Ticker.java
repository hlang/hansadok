package de.hartmut.lang.hansadok.db.exrate;

import org.bson.types.Decimal128;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


/**
 * hartmut on 28.04.18.
 */
@Document
public class Ticker {
    @Id
    private String id;

    private Date timestamp;
    private String pairName;
    private Decimal128 averageToday;
    private Decimal128 average24h;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
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

    public Decimal128 getAverage24h() {
        return average24h;
    }

    public void setAverage24h(Decimal128 average24h) {
        this.average24h = average24h;
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
