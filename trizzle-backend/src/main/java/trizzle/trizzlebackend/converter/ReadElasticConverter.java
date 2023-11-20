package trizzle.trizzlebackend.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@ReadingConverter
public class ReadElasticConverter implements Converter<Long, LocalDateTime> {
    @Override
    public LocalDateTime convert(Long source) {
        return Instant.ofEpochMilli(source).atZone(ZoneId.systemDefault()).toLocalDateTime();
    };
}