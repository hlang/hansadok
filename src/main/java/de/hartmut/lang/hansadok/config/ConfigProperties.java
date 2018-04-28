package de.hartmut.lang.hansadok.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * hartmut on 28.04.18.
 */
@Component
@ConfigurationProperties(prefix = "hansadok")
public class ConfigProperties {
    private String exrateSchedule = "/15 * * * * ?";
    private String exrateTickers;

    public String getExrateSchedule() {
        return exrateSchedule;
    }

    public void setExrateSchedule(String exrateSchedule) {
        this.exrateSchedule = exrateSchedule;
    }

    public String getExrateTickers() {
        return exrateTickers;
    }

    public void setExrateTickers(String exrateTickers) {
        this.exrateTickers = exrateTickers;
    }
}
