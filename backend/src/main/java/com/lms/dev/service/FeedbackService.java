package com.lms.dev.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.lms.dev.dto.FeedbackRequest;
import com.lms.dev.entity.Course;
import com.lms.dev.entity.Feedback;
import com.lms.dev.repository.CourseRepository;
import com.lms.dev.repository.FeedbackRepository;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final CourseRepository courseRepository;

    public List<Feedback> getFeedbacksForCourse(UUID courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found with id: " + courseId));
        return course.getFeedbacks();
    }

    public String submitFeedback(FeedbackRequest fr) {
        Course course = courseRepository.findById(fr.getCourse_id())
                .orElseThrow(() -> new EntityNotFoundException("Course not found with id: " + fr.getCourse_id()));
        
        Feedback feedback = new Feedback();
        feedback.setCourse(course);
        feedback.setComment(fr.getComment());
        feedbackRepository.save(feedback);
        return "feedback submitted successfully";
    }
}

