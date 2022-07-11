import React from 'react'
import AllCourseSession from '../allCourse/allCourseComponents/allCourseSession';
import ViewAllCoursePath from '../CoursePath/viewAllCoursePath';


const AllCourse = () => {

    return (
        <>
            <AllCourseSession path={'courseDetailGuest'} />
            <hr></hr>
            <ViewAllCoursePath />
        </>
    )
}

export default AllCourse;
