package com.urcarcher.be.rani;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.EqualsAndHashCode;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TravelCourseId implements Serializable {
    @Column(name = "place_id")
    private String placeId;

    @Column(name = "course_id")
    private String courseId;
}
