package com.lms.dev.config;

import com.lms.dev.entity.User;
import com.lms.dev.enums.UserRole;
import com.lms.dev.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@Slf4j
public class UserInitializer {

    @Bean
    public CommandLineRunner createDefaultStudent(UserRepository userRepository,
                                                  PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByEmail("student@gmail.com")) {
                User student = new User();
                student.setUsername("student");
                student.setPassword(passwordEncoder.encode("student123"));
                student.setEmail("student@gmail.com");
                student.setRole(UserRole.USER);
                student.setIsActive(true);
                student.setMobileNumber("9876543210");
                student.setProfession("Student");
                userRepository.save(student);
                log.info("Default student user created: student@gmail.com / student123");
            }
        };
    }
}
