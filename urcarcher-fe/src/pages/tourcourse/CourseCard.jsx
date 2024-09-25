import React from 'react';

import 'assets/CourseCard.css';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/course/${course.courseId}`, { state: { courseName: course.courseName, courseRegion: course.region } });
    };
    
    // 이미지 URL 정리
    const imageUrl = course.courseImg.replace(/^"|"$/g, '');

    return (
        <div onClick={handleClick} className="course-card-link">
            <div className="course-card">
                <div className='course-img-box'>
                    <img
                        src={imageUrl}
                        alt={course.courseName}
                        className="course-image"
                    />
                </div>
                <div className="course-info">
                    <p className="course-region">{course.region}</p>
                    <div className ="course-name-wrap">
                        <p className="course-name">{course.courseName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;