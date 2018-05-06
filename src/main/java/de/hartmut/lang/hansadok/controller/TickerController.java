package de.hartmut.lang.hansadok.controller;

import de.hartmut.lang.hansadok.config.ConfigProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

/**
 * hartmut on 05.05.18.
 */
@RestController
@RequestMapping("/tickerctrl")
public class TickerController {
    private static Logger LOG = LoggerFactory.getLogger(TickerController.class);

    private final ConfigProperties configProperties;

    public TickerController(ConfigProperties configProperties) {
        this.configProperties = configProperties;
    }

    @GetMapping("/pairs")
    public ResponseEntity<List<String>> getTickerPairs() {
        LOG.debug("getTickerPairs()");
        List<String> tickers = Arrays.asList(configProperties.getExrateTickers().split(","));

        return ResponseEntity.ok(tickers);
    }

}
