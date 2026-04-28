package com.lms.dev.service;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Material;
import com.lms.dev.entity.Submission;
import com.lms.dev.entity.User;
import com.lms.dev.repository.CourseRepository;
import com.lms.dev.repository.MaterialRepository;
import com.lms.dev.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseContentService {

    private final MaterialRepository materialRepository;
    private final SubmissionRepository submissionRepository;
    private final CourseRepository courseRepository;
    private final UserService userService;

    public Material uploadMaterial(UUID courseId, MultipartFile file) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Material material = new Material();
        material.setFileName(file.getOriginalFilename());
        material.setFileType(file.getContentType());
        material.setData(file.getBytes());
        material.setCourse(course);

        return materialRepository.save(material);
    }

    public List<Material> getMaterialsByCourse(UUID courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return materialRepository.findByCourse(course);
    }

    public Material getMaterial(UUID id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Material not found"));
    }

    public Submission submitProject(UUID courseId, UUID userId, MultipartFile file) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        User user = userService.getUserById(userId);

        Submission submission = submissionRepository.findByUserAndCourse(user, course);
        if (submission == null) {
            submission = new Submission();
            submission.setCourse(course);
            submission.setUser(user);
        }

        submission.setFileName(file.getOriginalFilename());
        submission.setFileType(file.getContentType());
        submission.setData(file.getBytes());
        submission.setStatus("COMPLETED");

        return submissionRepository.save(submission);
    }

    public List<Submission> getSubmissionsByCourse(UUID courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return submissionRepository.findByCourse(course);
    }
    
    public Submission getSubmission(User user, Course course) {
        return submissionRepository.findByUserAndCourse(user, course);
    }

    public List<Submission> getAllSubmissions() {
        return submissionRepository.findAll();
    }

    public Submission updateStatus(UUID id, String status) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        submission.setStatus(status);
        return submissionRepository.save(submission);
    }

    public Submission getSubmissionById(UUID id) {
        return submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
    }

    public Course uploadVideo(UUID courseId, MultipartFile file) throws IOException {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setVideo_data(file.getBytes());
        course.setVideo_type(file.getContentType());
        return courseRepository.save(course);
    }

    public Course getCourse(UUID courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }
}
