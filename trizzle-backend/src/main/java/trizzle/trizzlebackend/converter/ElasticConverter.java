package trizzle.trizzlebackend.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@WritingConverter
public class ElasticConverter implements Converter<LocalDateTime, Long> {
    @Override
    public Long convert(LocalDateTime ldt) {
        return ldt.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    };
};


