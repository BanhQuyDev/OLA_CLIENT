import React, { useEffect, useState } from 'react'
import CourseNameSessionGuest from './GuestComponents/courseNameSessionGuest'
import CourseDescriptionSession from '../courseDetail/CourseDetailComponent/courseDescriptionSession'
import CourseLearningPath from '../courseDetail/CourseDetailComponent/courseLearningPath'
import StudentReview2 from '../courseDetail/CourseDetailComponent/studentReview2'
import LinearProgress from '@mui/material/LinearProgress';
import CourseTeacher from '../courseDetail/CourseDetailComponent/courseTeacher'
import { useParams } from 'react-router-dom'
import { getCourseDetail, getCourseTeacher } from '../../services/courses.services'

let CourseDetailGuest = (props) => {
    const courseId = useParams()
    const [dataFeature, setDataFeature] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [teacherInfo, setTeacherInfo] = useState({})
    // const [feedback, setFeedback] = useState([])

    useEffect(() => {
        const getCourseData = async () => {
            setLoading(true)
            const courseData = await getCourseDetail(courseId.id)
            setDataFeature(courseData)

            // const courseFeedback = await getCourseFeedback(courseId.id)
            // setFeedback(courseFeedback)

            const courseTeacher = await getCourseTeacher(courseId.id)
            setTeacherInfo(courseTeacher[0])

            // get data here 
            setLoading(false)
        }
        getCourseData()
    }, [])
    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : (
                    <div>
                        <CourseNameSessionGuest
                            courseImage={dataFeature?.image}
                            courseName={dataFeature?.name}
                            courseShortDescription={dataFeature?.description.slice(0, 100)}
                            courseID={dataFeature?.id}
                        />
                        <CourseDescriptionSession
                            courseDesc={dataFeature?.description}
                            courseLevel={dataFeature?.level}
                            courseExp={dataFeature?.exp}
                        />
                        <CourseLearningPath
                            dataFeature={dataFeature}
                        />
                        <CourseTeacher teacherInfo={teacherInfo} />
                        <StudentReview2 />
                    </div>
                )
            }
        </>
    )
}


export default CourseDetailGuest;
