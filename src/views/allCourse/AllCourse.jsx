import React from 'react'
import AllCourseSession from './allCourseComponents/allCourseSession';
import ViewAllCoursePath from '../CoursePath/viewAllCoursePath';


const AllCourse = () => {

    return (
        <>
            <AllCourseSession path={'courseDetail'} />
            <hr></hr>
            <ViewAllCoursePath />
        </>
    )
}

export default AllCourse;
