package id.vn.thongdanghoang.graceful;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class GracefulApplication {

	public static void main(String[] args) {
		SpringApplication.run(GracefulApplication.class, args);
	}

}
