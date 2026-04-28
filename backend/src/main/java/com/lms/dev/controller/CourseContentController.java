package com.lms.dev.controller;

import com.lms.dev.entity.Course;
import com.lms.dev.entity.Material;
import com.lms.dev.entity.Submission;
import com.lms.dev.entity.User;
import com.lms.dev.service.CourseContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseContentController {

    private final CourseContentService courseContentService;

    @PostMapping("/{courseId}/materials")
    public ResponseEntity<Material> uploadMaterial(@PathVariable UUID courseId, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(courseContentService.uploadMaterial(courseId, file));
    }

    @GetMapping("/{courseId}/materials")
    public ResponseEntity<List<Material>> getMaterials(@PathVariable UUID courseId) {
        return ResponseEntity.ok(courseContentService.getMaterialsByCourse(courseId));
    }

    @GetMapping("/materials/{id}")
    public ResponseEntity<byte[]> downloadMaterial(@PathVariable UUID id) {
        Material material = courseContentService.getMaterial(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + material.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(material.getFileType()))
                .body(material.getData());
    }

    @PostMapping("/{courseId}/submit")
    public ResponseEntity<Submission> submitProject(@PathVariable UUID courseId, @RequestParam("userId") UUID userId, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(courseContentService.submitProject(courseId, userId, file));
    }

    @GetMapping("/{courseId}/submissions")
    public ResponseEntity<List<Submission>> getSubmissions(@PathVariable UUID courseId) {
        return ResponseEntity.ok(courseContentService.getSubmissionsByCourse(courseId));
    }

    @GetMapping("/all-submissions")
    public ResponseEntity<List<Submission>> getAllSubmissions() {
        return ResponseEntity.ok(courseContentService.getAllSubmissions());
    }

    @PatchMapping("/submissions/{id}")
    public ResponseEntity<Submission> updateSubmissionStatus(@PathVariable UUID id, @RequestParam String status) {
        return ResponseEntity.ok(courseContentService.updateStatus(id, status));
    }

    @GetMapping("/submissions/{id}/download")
    public ResponseEntity<byte[]> downloadSubmission(@PathVariable UUID id) {
        Submission submission = courseContentService.getSubmissionById(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + submission.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(submission.getFileType()))
                .body(submission.getData());
    }

    @GetMapping("/{courseId}/submissions/user/{userId}")
    public ResponseEntity<Submission> getSubmissionByUser(@PathVariable UUID courseId, @PathVariable UUID userId) {
        Course course = new Course(); course.setCourse_id(courseId);
        User user = new User(); user.setId(userId);
        return ResponseEntity.ok(courseContentService.getSubmission(user, course));
    }

    @PostMapping("/{courseId}/video")
    public ResponseEntity<Course> uploadCourseVideo(@PathVariable UUID courseId, @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(courseContentService.uploadVideo(courseId, file));
    }

    @GetMapping("/{courseId}/video")
    public ResponseEntity<byte[]> streamCourseVideo(@PathVariable UUID courseId) {
        Course course = courseContentService.getCourse(courseId);
        if (course.getVideo_data() == null) return ResponseEntity.notFound().build();
        
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(course.getVideo_type()))
                .body(course.getVideo_data());
    }
}
