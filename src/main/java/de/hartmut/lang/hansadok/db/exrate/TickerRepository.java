package de.hartmut.lang.hansadok.db.exrate;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * hartmut on 28.04.18.
 */
public interface TickerRepository extends MongoRepository<Ticker, String> {
}
