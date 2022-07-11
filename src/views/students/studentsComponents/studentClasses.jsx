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
import { getAllClassesStudent } from 'src/services/classes.services';
import { useAuthContext } from 'src/context/AuthContext';
import { toast } from 'react-toastify';
import { getOneClassReport, updateClassStatus } from 'src/services/classes.services';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    hr: {
        margin: '50px 0'
    }

}))

const StudentClasses = () => {
    const classes = useStyles();
    let history = useHistory()
    const auth = useAuthContext()
    const [allCurrentClasses, setAllCurrentClasses] = useState([])
    const [allPastClasses, setAllPastClasses] = useState([])

    useEffect(() => {
        const getData = async () => {
            const idStudent = JSON.parse(auth.user).id
            const { status, data } = await getAllClassesStudent(idStudent)
            if (status === 200) {
                if (data && data.length > 0) {
                    const allMissLabelClasses = data.filter(c => c.status === 'inComing').filter(y => new Date(y.end_time) < new Date())
                    if (allMissLabelClasses.length > 0) {
                        let resultFlag = true
                        for (const missLabelClass of allMissLabelClasses) {
                            const { status } = await updateClassStatus(missLabelClass.id, { status: 'Completed' })
                            if (status !== 200) {
                                resultFlag = false
                            }
                        }
                        if (resultFlag) {
                            const { status, data } = await getAllClassesStudent(idStudent)
                            if (status === 200) {
                                if (data && data.length > 0) {
                                    setAllCurrentClasses(data.filter(c => c.status === 'inComing'))
                                    setAllPastClasses(data.filter(c => c.status === 'Completed'))
                                } else {
                                    toast.error('Something wrong happened')
                                }
                            }
                        }
                    } else {
                        setAllCurrentClasses(data.filter(c => c.status === 'inComing'))
                        setAllPastClasses(data.filter(c => c.status === 'Completed'))
                    }
                }
            }
        }
        getData()
    }, [])

    const seeTeacherInfo = (id) => {
        history.push(`/users/${id}/teacher`)
    }

    const learnClass = (id, startTime, teacherId) => {
        // if (lessThanFifteenMinutesAgo(startTime)) {
        const studentName = JSON.parse(auth.user).userName
        history.push(`/room/${id}/${studentName}/${teacherId}`)
        // } else {
        //     toast.warn('Come back 15 minutes before the class starts')
        // }
    }

    const lessThanFifteenMinutesAgo = (start) => {
        const myDate = new Date(start)
        const quarter = 1000 * 60 * 15;
        return (((myDate - new Date())) < quarter)
    }

    const TeacherIcon = (
        <InfoIcon color="primary" sx={{ cursor: 'pointer' }} />
    );
    const RightArrowIcon = (status, startTime, id, teacherId) => status === 'inComing' ? (
        <div onClick={() => learnClass(id, startTime, teacherId)}>
            <ArrowForwardIosIcon color="primary" sx={{ cursor: 'pointer' }} />
        </div>
    ) : null;

    const handleOpenReport = (classId) => {
        getClassReport(classId)
    }

    const getClassReport = async (classId) => {
        const { data, status } = await getOneClassReport(classId)
        if (status === 200) {
            if (data.id) {
                window.open(data.report_url, "_blank")
            } else {
                toast.warn('This class does not have a report')
            }
        } else {
            toast.error('Error loading report')
        }
    }

    return (
        <>
            <div className={classes.root}>
                <div>
                    <h6 style={{ marginBottom: '20px' }}>Booked Classes</h6>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Class Id</TableCell>
                                    <TableCell>Teacher</TableCell>
                                    <TableCell align="center">Start Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">See Teacher Info</TableCell>
                                    <TableCell align="center">Join Class</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allCurrentClasses.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Tooltip title={row.id} >
                                                <span className={classes.truncate}>{row.id}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={row.firstName + ' ' + row.lastName} >
                                                <span className={classes.truncate}>{row.firstName + ' ' + row.lastName}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.starting_time ? new Date(row.starting_time).toLocaleString() : ''} >
                                                <span className={classes.truncate}>
                                                    {row.starting_time ? new Date(row.starting_time).toLocaleString() : ''}
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.status} >
                                                <span className={classes.truncate}>{row.status}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell onClick={() => seeTeacherInfo(row.id_teacher)} align="center">{TeacherIcon}</TableCell>
                                        <TableCell align="center">{RightArrowIcon(row.status, row.starting_time, row.id, row.id_teacher)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <hr className={classes.hr}></hr>
                <div>
                    <h6 style={{ marginBottom: '20px' }}>Booked Classes</h6>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Class Id</TableCell>
                                    <TableCell>Teacher</TableCell>
                                    <TableCell align="center">Start Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">See Teacher Info</TableCell>
                                    <TableCell align="center">View Report</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allPastClasses.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Tooltip title={row.id} >
                                                <span className={classes.truncate}>{row.id}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={row.firstName + ' ' + row.lastName} >
                                                <span className={classes.truncate}>{row.firstName + ' ' + row.lastName}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.starting_time ? new Date(row.starting_time).toLocaleString() : ''} >
                                                <span className={classes.truncate}>
                                                    {row.starting_time ? new Date(row.starting_time).toLocaleString() : ''}
                                                </span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.status} >
                                                <span className={classes.truncate}>{row.status}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell onClick={() => seeTeacherInfo(row.id_teacher)} align="center">{TeacherIcon}</TableCell>
                                        <TableCell
                                            onClick={() => handleOpenReport(row.id)}
                                            align="center">{TeacherIcon}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    )
}

export default StudentClasses
