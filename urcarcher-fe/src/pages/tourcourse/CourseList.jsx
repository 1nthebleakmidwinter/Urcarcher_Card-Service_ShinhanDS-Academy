import React, { useEffect, useState } from 'react';
import RegionList from './RegionList';
import RegionSelect from './RegionSelect';
import SortOptions from './SortOptions';
import CourseCard from './CourseCard';
import '../../assets/CourseList.css';
import '../../assets/RegionList.css';
import '../../assets/SortOptions.css';
import i18n from "locales/i18n";
import { useTranslation } from 'react-i18next';
const CourseList = () => {
    const { selectedRegion, courses, regions, handleRegionClick } = RegionSelect();
    const [sortOption, setSortOption] = useState('최신순');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [visibleCourses, setVisibleCourses] = useState([]);  
    const [hasMore, setHasMore] = useState(true);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        let filtered = courses;
        if (selectedRegion) {
            filtered = courses.filter(course => course.region === selectedRegion);
        }
    
        const sorted = filtered.sort((a, b) => {
            if (sortOption === '최신순') {
                return b.courseId.localeCompare(a.courseId); 
            } else if (sortOption === '조회순') {
                return b.viewCount - a.viewCount;  
            } else if (sortOption === '인증순') {
                return b.certifications - a.certifications;  
            }
            return 0;
        });
    
        setFilteredCourses(sorted);
        setVisibleCourses(sorted.slice(0, 10));  
        setHasMore(sorted.length > 10); 
    }, [selectedRegion, sortOption, courses]);

    const loadMoreCourses = () => {
        if (visibleCourses.length >= filteredCourses.length) {
            setHasMore(false); 
            return;
        }
        const newCourses = filteredCourses.slice(visibleCourses.length, visibleCourses.length + 10);
        setVisibleCourses(prevCourses => [...prevCourses, ...newCourses]);  
    };

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            loadMoreCourses(); 
        }
    };

  

    return (

        
        <div className="inner-div" >

        <RegionList regions={regions} handleRegionClick={handleRegionClick}  selectedRegion={selectedRegion} />
        <SortOptions setSortOption={setSortOption} />
        <div className="course-list" onScroll={handleScroll} >
            {visibleCourses.map(course => (
                <CourseCard key={course.courseId} course={course} />
            ))}
        </div>
    </div>
    );
};

export default CourseList;
