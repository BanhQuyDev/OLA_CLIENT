import React, { useEffect, useState } from 'react'
import CourseNameSession from './CourseDetailComponent/courseNameSession'
import CourseDescriptionSession from './CourseDetailComponent/courseDescriptionSession'
import CourseLearningPath from './CourseDetailComponent/courseLearningPath'
import StudentReview2 from './CourseDetailComponent/studentReview2'
// import { Container, Row } from 'reactstrap';
import LinearProgress from '@mui/material/LinearProgress';
import CourseTeacher from './CourseDetailComponent/courseTeacher'
import { useHistory, useParams } from 'react-router-dom'
import { getCourseDetail, getCourseTeacher } from '../../services/courses.services'
import Button from '@mui/material/Button';
import { useAuthContext } from 'src/context/AuthContext'
import { checkStudentRegisterCourseStatus } from '../../services/user.services'

let CourseDetail = (props) => {
    const history = useHistory()
    const courseId = useParams()
    const [dataFeature, setDataFeature] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [teacherInfo, setTeacherInfo] = useState({})
    // const [feedback, setFeedback] = useState([])
    const auth = useAuthContext()
    const currentStudent = JSON.parse(auth.user)
    const [regStatus, setRegStatus] = useState(false)

    useEffect(() => {
        const getCourseData = async () => {
            setLoading(true)
            const courseData = await getCourseDetail(courseId.id)
            console.log(courseData)
            setDataFeature(courseData)

            // const courseFeedback = await getCourseFeedback(courseId.id)
            // setFeedback(courseFeedback)

            const courseTeacher = await getCourseTeacher(courseId.id)
            setTeacherInfo(courseTeacher[0])

            // get data here 
            setLoading(false)
        }
        getCourseData()
        const checkRegStatus = async () => {
            const status = await checkStudentRegisterCourseStatus(currentStudent.id, courseId.id)
            // have to use if else here bc status is not boolean in some cases
            if (status === false) {
                setRegStatus(false)
            } else {
                setRegStatus(true)
            }
            console.log(status)
        }
        checkRegStatus()
    }, [])
    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : (
                    <div>
                        <CourseNameSession
                            // loginState={this.state.loginState}
                            courseImage={dataFeature?.image}
                            courseName={dataFeature?.name}
                            courseShortDescription={dataFeature?.description.slice(0, 100)}
                            courseID={dataFeature?.id}
                            regStatus={regStatus}
                            setRegStatus={setRegStatus}
                            isFree={dataFeature?.isFree}
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
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '40px'
                        }}>
                            {
                                regStatus ? (
                                    <Button
                                        onClick={() => { history.push(`/feedback/course/${courseId.id}`) }}
                                        variant="outlined"
                                    >SEND REVIEW</Button>
                                ) : null
                            }

                        </div>
                    </div>
                )
            }
        </>
    )
}


export default CourseDetail;
