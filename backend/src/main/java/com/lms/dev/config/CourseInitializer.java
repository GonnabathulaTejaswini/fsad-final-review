package com.lms.dev.config;

import com.lms.dev.entity.Course;
import com.lms.dev.repository.CourseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@Slf4j
public class CourseInitializer {

    @Bean
    public CommandLineRunner initCourses(CourseRepository courseRepository) {
        return args -> {
            if (courseRepository.count() == 0) {
                Course c1 = new Course();
                c1.setCourse_name("Introduction to React");
                c1.setInstructor("John Doe");
                c1.setPrice(99);
                c1.setDescription("Learn the basics of React.js, including components, props, and state.");
                c1.setY_link("https://www.youtube.com/embed/eIrMbAQSU34");
                c1.setP_link("https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");

                Course c2 = new Course();
                c2.setCourse_name("Spring Boot Mastery");
                c2.setInstructor("Jane Smith");
                c2.setPrice(149);
                c2.setDescription("Build robust REST APIs and microservices with Spring Boot and Spring Data JPA.");
                c2.setY_link("https://www.youtube.com/embed/9SGDpanrc8U");
                c2.setP_link("https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");

                Course c3 = new Course();
                c3.setCourse_name("Advanced Java Programming");
                c3.setInstructor("Robert Brown");
                c3.setPrice(199);
                c3.setDescription("Deep dive into Java 17 features, streams, lambdas, and concurrency.");
                c3.setY_link("https://www.youtube.com/embed/V6H8qB7-X3U");
                c3.setP_link("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80");

                courseRepository.saveAll(List.of(c1, c2, c3));
                log.info("Sample courses initialized.");
            }
        };
    }
}
