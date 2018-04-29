package de.hartmut.lang.hansadok.exrate.kraken;

import de.hartmut.lang.hansadok.config.ConfigProperties;
import de.hartmut.lang.hansadok.db.exrate.Ticker;
import de.hartmut.lang.hansadok.db.exrate.TickerRepository;
import org.bson.types.Decimal128;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import java.net.URI;
import java.time.Instant;
import java.util.Date;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * hartmut on 26.04.18.
 */
@Component
public class KrakenLoader implements Runnable {
    private static Logger LOG = LoggerFactory.getLogger(KrakenLoader.class);
    private static final String KRAKEN_BASE_URL = "https://api.kraken.com/0/public";
    private static final Pattern AVERAGE_PATTERN = Pattern.compile("\"p\":\\[\"(\\d+.\\d+)\",\"(\\d+.\\d+)\"]");


    private final ConfigProperties configProperties;
    private final RestTemplateBuilder restTemplateBuilder;
    private final TickerRepository tickerRepository;
    private final ScheduledExecutorService executor = Executors.newScheduledThreadPool(2);

    private RestTemplate restTemplate;
    private UriComponentsBuilder tickerQuery;

    public KrakenLoader(ConfigProperties configProperties, RestTemplateBuilder restTemplateBuilder, TickerRepository tickerRepository) {
        this.configProperties = configProperties;
        this.restTemplateBuilder = restTemplateBuilder;
        this.tickerRepository = tickerRepository;
    }

    @PostConstruct
    public void init() {
        LOG.info("init() ....");
        restTemplate = restTemplateBuilder.build();

        UriComponentsBuilder baseUri = UriComponentsBuilder.fromUriString(KRAKEN_BASE_URL);
        tickerQuery = baseUri.path("/Ticker").query("pair={pair}");
        // executor.scheduleAtFixedRate(this, 5, 15, TimeUnit.SECONDS);

    }

    @Override
    public void run() {
        LOG.info("run() ...");
        String[] tickers = configProperties.getExrateTickers().split(",");
        for (String ticker : tickers) {
            loadTicker(ticker);
        }

    }

    public void loadTicker(String pair) {
        LOG.info("loadTicker(): pair {}", pair);
        URI tickerUri = tickerQuery.build(pair);
        ResponseEntity<String> response =
                restTemplate.getForEntity(tickerUri, String.class);
        LOG.debug(response.getBody());

        Matcher matcher = AVERAGE_PATTERN.matcher(response.getBody());
        if (matcher.find()) {
            Ticker ticker = new Ticker();
            ticker.setPairName(pair);
            ticker.setTimestamp(Date.from(Instant.now()));
            ticker.setAverageToday(Decimal128.parse(matcher.group(1)));
            ticker.setAverage24h(Decimal128.parse(matcher.group(2)));
            tickerRepository.save(ticker);
            LOG.info("ticker: {}", ticker);
        }
    }


}
