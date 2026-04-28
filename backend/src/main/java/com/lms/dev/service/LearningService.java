package com.lms.dev.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.lms.dev.dto.EnrollRequest;
import com.lms.dev.entity.Course;
import com.lms.dev.entity.Learning;
import com.lms.dev.entity.Progress;
import com.lms.dev.entity.User;
import com.lms.dev.repository.CourseRepository;
import com.lms.dev.repository.LearningRepository;
import com.lms.dev.repository.ProgressRepository;
import com.lms.dev.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.*;

@RequiredArgsConstructor
@Service
public class LearningService {

    private final LearningRepository learningRepository;

    private final UserRepository userRepository;

    private final CourseRepository courseRepository;
    
    private final ProgressRepository progressRepository;

    @Transactional(readOnly = true)
    public List<Course> getLearningCourses(UUID userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Course> learningCourses = new ArrayList<>();

            for (Learning learning : user.getLearningCourses()) {
                Course course = learning.getCourse();
                learningCourses.add(course);
            }

            return learningCourses;
        }

        throw new EntityNotFoundException("User not found with id: " + userId);
    }
    
    public List<Learning> getEnrollments() {
    	return learningRepository.findAll();
    }

    @Transactional
    public String enrollCourse(EnrollRequest enrollRequest) {
        User user = userRepository.findById(enrollRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + enrollRequest.getUserId()));
        Course course = courseRepository.findById(enrollRequest.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("Course not found with id: " + enrollRequest.getCourseId()));

        Learning existingLearning = learningRepository.findByUserAndCourse(user, course);
        if (existingLearning != null) {
            return "Course already enrolled";
        }

        Progress progress = new Progress();
        progress.setUser(user);
        progress.setCourse(course);
        progressRepository.save(progress);

        Learning learning = new Learning();
        learning.setUser(user);
        learning.setCourse(course);
        learningRepository.save(learning);

        return "Enrolled successfully";
    }


    public void unenrollCourse(UUID id) {
        learningRepository.deleteById(id);
    }
}

