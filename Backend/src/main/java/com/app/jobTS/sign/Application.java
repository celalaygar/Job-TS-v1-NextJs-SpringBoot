package com.app.jobTS.sign;

import com.app.jobTS.sign.auth.model.Role;
import com.app.jobTS.sign.auth.model.User;
import com.app.jobTS.sign.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(UserRepository usereRepository,
										 PasswordEncoder passwordEncoder) {
		return (args) -> {
			try {

				User user4 = new User();
				user4.setFirstname("second user");
				user4.setLastname("last user ");
				user4.setEmail("user2@gmail.com");
				user4.setPassword(passwordEncoder.encode( "user2"));
				user4.setRole(Role.USER);
				usereRepository.save(user4);


				User user1 = new User();
				user1.setFirstname("BY admin");
				user1.setLastname("extra");
				user1.setEmail("admin@gmail.com");
				user1.setPassword(passwordEncoder.encode( "admin"));
				user1.setRole(Role.ADMIN);
				usereRepository.save(user1);

				User user2 = new User();
				user2.setFirstname("manager");
				user2.setLastname("manager serr");
				user2.setEmail("manager@gmail.com");
				user2.setPassword(passwordEncoder.encode( "manager"));
				user2.setRole(Role.MANAGER);
				usereRepository.save(user2);

				User user3 = new User();
				user3.setFirstname("first user");
				user3.setLastname("last user ");
				user3.setEmail("user@gmail.com");
				user3.setPassword(passwordEncoder.encode( "user"));
				user3.setRole(Role.USER);
				usereRepository.save(user3);

			} catch (Exception e) {
				System.out.println(e);
			}
		};
	}
}
