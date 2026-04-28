package com.lms.dev.repository;

import com.lms.dev.entity.Material;
import com.lms.dev.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, UUID> {
    List<Material> findByCourse(Course course);
}
