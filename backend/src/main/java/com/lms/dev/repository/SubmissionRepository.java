package com.lms.dev.repository;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Submission;
import com.lms.dev.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {
    List<Submission> findByCourse(Course course);
    List<Submission> findByUser(User user);
    Submission findByUserAndCourse(User user, Course course);
}
