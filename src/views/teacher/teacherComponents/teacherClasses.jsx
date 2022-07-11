import React, { useEffect, useRef, useState } from 'react'
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
import { getTeacherBusyTime } from 'src/services/classes.services';
import { useAuthContext } from 'src/context/AuthContext';
import { toast } from 'react-toastify';
import { getAllClassesTeacher } from 'src/services/classes.services';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import Dropzone from 'react-dropzone';
import { getMultipleUnitPresignedUrls, uploadMultipleUnitPresignedUrls } from 'src/services/courses.services';
import { fileUrl } from 'src/utilities/shared-constants';
import { saveClassReport, getOneClassReport, updateClassReport } from 'src/services/classes.services';

function FormReportDialog(props) {
    const [formLoading, setFormLoading] = useState(false)
    const [savedReport, setSavedReport] = useState(undefined)
    const [currentFileReport, setCurrentFileReport] = useState(undefined);
    const reportDescRef = useRef('')

    const getClassReport = async (classId) => {
        setFormLoading(true)
        const { data, status } = await getOneClassReport(classId)
        if (status === 200) {
            if (data.id) {
                setSavedReport(data)
                reportDescRef.current.value = data.desc
            }
        } else {
            toast.error('Error loading report')
        }
        setFormLoading(false)
    }
    useEffect(() => {
        setSavedReport(undefined)
        if (props.currentId && props.currentId > 0) {
            getClassReport(props.currentId)
        }
    }, [props.currentId])


    const handleClose = () => {
        setCurrentFileReport(undefined)
        props.setOpen(false);
    };

    const handleUploadReport = async () => {
        let toBeSavedReport = {
            name: 'Report_Class_' + props.currentId,
            desc: reportDescRef.current.value,
            idStudent: props.currentStudent,
            idTeacher: props.currentTeacher,
            idClass: props.currentId,
        }
        if (toBeSavedReport.name && toBeSavedReport.desc && toBeSavedReport.idStudent && toBeSavedReport.idTeacher && toBeSavedReport.idClass && currentFileReport) {
            setFormLoading(true)
            const uploadReportUrl = await getMultipleUnitPresignedUrls([toBeSavedReport.name + "_Report_File"], 'pdf')
            const statusUploadReport = await uploadMultipleUnitPresignedUrls([currentFileReport], uploadReportUrl, 'pdf')
            if (statusUploadReport[0].status === "fulfilled") {
                const reportURL_DB = fileUrl + toBeSavedReport.name + "_Report_File"
                toBeSavedReport.report_url = reportURL_DB

                // send data to create report here
                const { data, status } = await saveClassReport(toBeSavedReport)
                if (status === 201) {
                    setSavedReport(data.saveReport)
                    reportDescRef.current.value = data.saveReport.desc
                    toast.success("Upload report successfully")
                } else {
                    toast.error('Error creating report')
                }
            } else {
                toast.error('Error uploading report')
            }
            setFormLoading(false)
        } else {
            toast.warn('Some error happened or you have not written description and uploaded file yet')
        }
        handleClose()

    }

    const handleUploadUpdatedReport = async () => {
        setFormLoading(true)
        let toBeUpdatedReport = {
            desc: reportDescRef.current.value,
            report_url: savedReport.report_url
        }
        if (savedReport.id && toBeUpdatedReport.desc) {
            if (currentFileReport) {
                const uploadReportUrl = await getMultipleUnitPresignedUrls([savedReport.name + "_Report_File"], 'pdf')
                const statusUploadReport = await uploadMultipleUnitPresignedUrls([currentFileReport], uploadReportUrl, 'pdf')
                if (statusUploadReport[0].status === "fulfilled") {
                    // send data to update report here
                    const { data, status } = await updateClassReport(toBeUpdatedReport, savedReport.id)
                    if (status === 200) {
                        setSavedReport(data.newReport)
                        reportDescRef.current.value = data.newReport.desc
                        toast.success("Update report successfully")
                    } else {
                        toast.error('Error updating report')
                    }
                } else {
                    toast.error('Error updating when uploading report')
                }
            } else {
                const { data, status } = await updateClassReport(toBeUpdatedReport, savedReport.id)
                if (status === 200) {
                    setSavedReport(data.newReport)
                    reportDescRef.current.value = data.newReport.desc
                    toast.success("Update report successfully")
                } else {
                    toast.error('Error updating report')
                }
            }
            setFormLoading(false)
        } else {
            toast.warn('Some error happened or you have not written description yet')
        }

        handleClose()
    }

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                {
                    formLoading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
                }
                <DialogTitle>{'Report for class: ' + props.currentId}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Teacher can add or update report about a class after having a 1-1 class with a student.
                    </DialogContentText>
                    <br />
                    <TextField
                        placeholder="Enter Report's description"
                        multiline
                        rows={4}
                        defaultValue={savedReport?.desc}
                        fullWidth
                        variant="filled"
                        inputRef={reportDescRef}
                        sx={{ marginBottom: '15px' }}
                    />
                    <section style={{
                        height: '100px',
                        border: "1px dotted grey",
                        padding: '10px',
                    }}>
                        <Dropzone maxFiles={1} onDrop={acceptedFiles => {
                            if (acceptedFiles.length > 0) {
                                setCurrentFileReport(acceptedFiles[0])
                            }
                        }}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop New Report File here, or click to select file (only one)</p>
                                        <p style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }} >
                                            {currentFileReport ? currentFileReport.name : 'No selected video'}
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </section>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {savedReport && savedReport.report_url
                        ? (
                            <>
                                <Button onClick={() => window.open(savedReport.report_url, "_blank")}>
                                    View Saved Report</Button>
                                <Button onClick={() => handleUploadUpdatedReport()}>Update</Button>
                            </>
                        ) : (
                            <Button onClick={() => handleUploadReport()}>Create</Button>
                        )}
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    hr: {
        margin: '50px 0'
    }

}))

const TeacherIcon = (
    <InfoIcon color="primary" sx={{ cursor: 'pointer' }} />
);
const RightArrowIcon = (
    <ArrowForwardIosIcon color="primary" sx={{ cursor: 'pointer' }} />
);

const TeacherClasses = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const auth = useAuthContext()
    const currentUser = JSON.parse(auth.user)
    const [allCurrentClasses, setAllCurrentClasses] = useState([])
    const [allPastClasses, setAllPastClasses] = useState([])
    const [currentClass, setCurrentClass] = useState(0)

    // to open dialog
    const [open, setOpen] = useState(false);

    let history = useHistory()

    const getBusyTime = async () => {
        setLoading(true)
        const { status, data } = await getAllClassesTeacher(currentUser.id)
        if (status === 200) {
            console.log(data.classList.filter(c => c.status === 'Completed'))
            setAllCurrentClasses(data.classList.filter(c => c.status === 'inComing'))
            setAllPastClasses(data.classList.filter(c => c.status === 'Completed'))
        } else {
            toast.error('Something went wrong, please try again later')
        }
        setLoading(false)
    }

    useEffect(() => {
        getBusyTime()
    }, [])

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

    const RightArrowIcon = (status, startTime, id, teacherId) => status === 'inComing' ? (
        <div onClick={() => learnClass(id, startTime, teacherId)}>
            <ArrowForwardIosIcon color="primary" sx={{ cursor: 'pointer' }} />
        </div>
    ) : null;

    const seeStudentInfo = (id) => {
        history.push(`/users/${id}/student`)
    }

    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
            }
            <div className={classes.root}>
                <div>
                    <h6 style={{ marginBottom: '20px' }}>Current Classes</h6>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Class Id</TableCell>
                                    <TableCell>Student</TableCell>
                                    <TableCell align="center">Start Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">See Student Info</TableCell>
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
                                            <Tooltip title={row.studentFirstName + ' ' + row.studentLastName} >
                                                <span className={classes.truncate}>{row.studentFirstName + ' ' + row.studentLastName}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.starting_time ? new Date(row.starting_time).toLocaleString() : ''} >
                                                <span className={classes.truncate}>{row.starting_time ? new Date(row.starting_time).toLocaleString() : ''}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.status} >
                                                <span className={classes.truncate}>{row.status}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell onClick={() => seeStudentInfo(row.id_student)} align="center">{TeacherIcon}</TableCell>
                                        <TableCell align="center">{RightArrowIcon(row.status, row.starting_time, row.id, currentUser.id)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <hr className={classes.hr}></hr>
                <div>
                    <h6 style={{ marginBottom: '20px' }}>Past Classes</h6>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Class Id</TableCell>
                                    <TableCell>Student</TableCell>
                                    <TableCell align="center">Start Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">See Student Info</TableCell>
                                    <TableCell align="center">Report</TableCell>
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
                                            <Tooltip title={row.studentFirstName + ' ' + row.studentLastName} >
                                                <span className={classes.truncate}>{row.studentFirstName + ' ' + row.studentLastName}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.starting_time ? new Date(row.starting_time).toLocaleString() : ''} >
                                                <span className={classes.truncate}>{row.starting_time ? new Date(row.starting_time).toLocaleString() : ''}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.status} >
                                                <span className={classes.truncate}>{row.status}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell onClick={() => seeStudentInfo(row.id_student)} align="center">{TeacherIcon}</TableCell>
                                        <TableCell
                                            onClick={() => {
                                                setOpen(true);
                                                setCurrentClass({ classId: row.id, teacherId: currentUser.id, studentId: row.id_student });
                                            }}
                                            align="center">{TeacherIcon}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <FormReportDialog setOpen={setOpen} open={open} currentId={currentClass.classId} currentStudent={currentClass.studentId} currentTeacher={currentClass.teacherId} />
        </>
    )
}

export default TeacherClasses



