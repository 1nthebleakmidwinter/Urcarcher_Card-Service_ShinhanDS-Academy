import { useState, useEffect } from 'react';
import axios from 'axios';

const useCourseList = () => {
    const regions = ['전체','서울', '경기', '인천', '대전', '대구', '부산', '충청', '강원', '전라', '경상', '제주'];
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('/api/course/list')
            .then(response => {
                setCourses(response.data);
                console.log(response.data);
          
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const handleRegionClick = (region) => {
        if (region === '전체') {
            setSelectedRegion(null); // 전체를 선택하면 null로 설정하여 모든 코스를 표시
        } else {
            setSelectedRegion(region);
        }
    };
   

    return {
        selectedRegion,
        courses,
        regions,
        handleRegionClick,
    };
};

export default useCourseList;
