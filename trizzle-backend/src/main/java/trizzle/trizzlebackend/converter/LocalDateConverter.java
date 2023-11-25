package trizzle.trizzlebackend.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

@ReadingConverter
public class LocalDateConverter implements Converter<Long, LocalDate> {
    @Override
    public LocalDate convert(Long source) {
        Instant instant = Instant.ofEpochMilli(source);
        return instant.atZone(ZoneId.systemDefault()).toLocalDate();
    }
}
