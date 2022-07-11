import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuthContext } from 'src/context/AuthContext';
import { getOneCoursePath } from 'src/services/courses.services';
import GuideLineSection from '../createCourse/createCourseComponents/guideLineSection';
import { Chrono } from "react-chrono";

const useStyles = makeStyles((theme) => ({
    root: {
    },
    formPathSection: {
        height: '1000px',
        padding: '50px',
        borderRadius: '10px',
        // border: '1px solid #ccc',
    },
}))

const ViewCoursePath = () => {
    const classes = useStyles();
    const auth = useAuthContext()
    const params = useParams()
    const history = useHistory()
    const currentUser = JSON.parse(auth.user)
    const [loading, setLoading] = useState(false)
    const [pathInfo, setPathInfo] = useState({})
    const [courses, setCourses] = useState([])

    const getData = async () => {
        const { status, data } = await getOneCoursePath(params.pathId)
        if (status === 200) {
            console.log(data)
            setPathInfo(data.coursePath)
            let group = []
            data.groupCourse.forEach((course, idx) => {
                const courseCard = {
                    title: 'Course' + (idx + 1),
                    cardTitle: course.course_template.name,
                    url: window.location.origin + `#/courseDetail/${course.course_template.id}`,
                    cardDetailedText: course.course_template.description,
                    media: {
                        name:  course.course_template.name,
                        source: {
                          url: course.course_template.image
                        },
                        type: "IMAGE"
                      }
                }
                group.push(courseCard)
            })
            setCourses(group)
            setLoading(false)
        } else {
            toast.error('Something wrong happened')
        }
    }
    useEffect(() => {
        setLoading(true)
        getData()
    }, [])

    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
            }
            <GuideLineSection title={pathInfo.name} content={pathInfo.desc} />

            <div className={`${classes.formPathSection}`}>
                {
                    courses.length > 0 ? (<Chrono useReadMore items={courses} mode="VERTICAL_ALTERNATING" />) : null
                }

            </div>
        </>
    )
}

export default ViewCoursePath
