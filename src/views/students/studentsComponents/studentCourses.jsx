import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from "react-router-dom";
import { getAllCoursesStudent } from 'src/services/courses.services';
import { useAuthContext } from 'src/context/AuthContext';
import { getStudentFinishedUnit } from 'src/services/user.services';
import LinearProgress from '@mui/material/LinearProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    hr: {
        margin: '50px 0'
    }

}))

const CourseInfoIcon = (
    <InfoIcon color="primary" sx={{ cursor: 'pointer' }} />
);
const RightArrowIcon = (
    <ArrowForwardIosIcon color="primary" sx={{ cursor: 'pointer' }} />
);

const StudentCourse = () => {
    const classes = useStyles();
    let history = useHistory()
    const auth = useAuthContext()
    const currentUser = JSON.parse(auth.user)
    const [allCourses, setAllCourses] = useState([])
    const [loading, setLoading] = useState(false)

    //list of % for status for each course
    const [doneList, setDoneList] = useState([])

    useEffect(() => {
        const getData = async () => {
            const idStudent = currentUser.id
            const { status, data } = await getAllCoursesStudent(idStudent)
            if (status === 200) {
                if (data && data.length > 0) {
                    setAllCourses(data)
                    let list = []
                    for (const c of data) {
                        const percent = await mapLearningStatus(c.status, c.id, c.numOfUnit)
                        list.push(percent)
                    }
                    setDoneList(list)
                }
            }
            setLoading(false)
        }
        setLoading(true)
        getData()
    }, [])

    const seeCourseInfo = (id) => {
        history.push(`/courseDetail/${id}`)
    }

    const learnCourse = (id) => {
        history.push(`/learnCourse/${id}`)
    }

    const mapLearningStatus = async (statusCourse, courseId, totalUnitInCourse = 1) => {
        if (statusCourse === 'finished') {
            return "Done"
        }
        const { status, data } = await getStudentFinishedUnit(courseId, currentUser.id)
        if (status === 200) {
            const learningPercent = (data.length / totalUnitInCourse) * 100
            return learningPercent.toFixed(2) + ' %'
        } else {
            return 'Unfinished'
        }
    }

    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
            }
            <div className={classes.root}>
                <div>
                    <h6 style={{ marginBottom: '20px' }}>Registered Courses</h6>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Course's Name</TableCell>
                                    <TableCell>Level</TableCell>
                                    <TableCell align="center">Type</TableCell>
                                    <TableCell align="center">Learning Status</TableCell>
                                    <TableCell align="center">See&nbsp; Detail Info</TableCell>
                                    <TableCell align="center">Learn&nbsp; Course</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allCourses.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Tooltip title={row.name} >
                                                <span className={classes.truncate}>{row.name}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={row.level} >
                                                <span className={classes.truncate}>{row.level}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.type} >
                                                <span className={classes.truncate}>{row.type}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.status} >
                                                <span className={classes.truncate}>{doneList[index]}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell onClick={() => seeCourseInfo(row.id)} align="center">{CourseInfoIcon}</TableCell>
                                        <TableCell onClick={() => learnCourse(row.id)} align="center">{RightArrowIcon}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <hr className={classes.hr}></hr>
            </div>
        </>
    )
}

export default StudentCourse
