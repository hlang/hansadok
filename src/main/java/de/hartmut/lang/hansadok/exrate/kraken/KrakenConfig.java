package de.hartmut.lang.hansadok.exrate.kraken;

import de.hartmut.lang.hansadok.config.ConfigProperties;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

/**
 * hartmut on 27.04.18.
 */
@Component
public class KrakenConfig {
    private static Logger LOG = LoggerFactory.getLogger(KrakenConfig.class);


    private final ConfigProperties configProperties;
    private final Scheduler scheduler;

    public KrakenConfig(ConfigProperties configProperties, Scheduler scheduler) {
        this.configProperties = configProperties;
        this.scheduler = scheduler;
    }

    @PostConstruct
    public void init() throws SchedulerException {
        JobDetail job = JobBuilder.newJob()
                .ofType(KJob.class)
                .build();
        Trigger trigger = newTrigger()
                .withSchedule(cronSchedule(configProperties.getExrateSchedule()))
                .build();

        scheduler.scheduleJob(job, trigger);
    }

    public static class KJob extends QuartzJobBean {
        private static Logger LOG = LoggerFactory.getLogger(KJob.class);

        @Autowired
        private KrakenLoader krakenLoader;

        @Override
        protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
            krakenLoader.run();
        }
    }
}
