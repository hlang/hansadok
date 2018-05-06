package de.hartmut.lang.hansadok.db.exrate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * hartmut on 28.04.18.
 */
public interface TickerRepository extends MongoRepository<Ticker, String> {
    Page<Ticker> findByPairNameIn(@Param("pairNames") List<String> pairNames, Pageable pageable);
}
