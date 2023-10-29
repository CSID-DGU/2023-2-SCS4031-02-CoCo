package trizzle.trizzlebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "trizzle.trizzlebackend")
public class TrizzleBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TrizzleBackendApplication.class, args);
	}

}
