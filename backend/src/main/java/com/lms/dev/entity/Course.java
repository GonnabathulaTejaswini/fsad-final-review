package com.lms.dev.entity;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "course_id", updatable = false, nullable = false, columnDefinition = "BINARY(16)")
    private UUID course_id;

    @JsonProperty("course_name")
    private String course_name;

    private int price;

    private String instructor;

    private String description;

    private String p_link;

    private String y_link;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    @JsonIgnore
    private byte[] video_data;

    private String video_type;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Feedback> feedbacks;
    
    @OneToMany(mappedBy = "course")
    @JsonIgnore
    private List<Questions> questions;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Material> materials;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Submission> submissions;
}
