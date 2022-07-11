import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from '@mui/material/LinearProgress';
import GuideLineSection from '../createCourse/createCourseComponents/guideLineSection';
import { useHistory, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";
import LocalizationProvider from "@mui/lab/modern/LocalizationProvider";
import StaticDatePicker from "@mui/lab/modern/StaticDatePicker";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { getTeacherBusyTime, studentBookClass } from 'src/services/classes.services';
import { toast } from 'react-toastify';
import { useAuthContext } from 'src/context/AuthContext';
import { getStudentMembership, sendNotificationToUser } from 'src/services/user.services';
import { getAllClassesStudent } from 'src/services/classes.services';
// import { cloneDeep } from 'lodash';
import { startOfWeek, endOfWeek } from 'date-fns'


const useStyles = makeStyles((theme) => ({
    root: {
    },

    bookingSection: {
        // height: '430px',
        backgroundColor: 'white',
        padding: '50px',
        borderRadius: '10px',
        border: '1px solid #ccc',
    },

    chooseTime: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    bookClassButton: {
        marginTop: '30px !important',
        "&:focus": {
            outline: 'none',
            boxShadow: 'none'
        }
    },
}))

const BookClass = () => {
    const auth = useAuthContext()
    const currentUser = JSON.parse(auth.user)
    const classes = useStyles();
    const params = useParams()
    const history = useHistory()

    const timeOptions = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

    let nextDay = new Date()
    nextDay.setDate(new Date().getDate() + 3)
    const [loading, setLoading] = useState(false)
    const [selectedTime, setSelectedTime] = useState(timeOptions[0])
    const [selectedDay, setSelectedDay] = useState(nextDay)
    const [availableHours, setAvailableHours] = useState(timeOptions)
    const [busyTimes, setBusyTimes] = useState(undefined)
    const [paidStudent, setPaidStudent] = useState(false)
    const [membershipStudent, setMembershipStudent] = useState(undefined)
    const [studentSavedClasses, setStudentSavedClasses] = useState([])

    const getStudentDataClasses = async (teacherTimes) => {
        const idStudent = currentUser.id
        const { status, data } = await getAllClassesStudent(idStudent)
        if (status === 200) {
            let studentClasses = []
            if (data.length > 0) {
                studentClasses = [...data]
            }
            // setAllClasses(data)
            const studentTimes = studentClasses.map(x => x.starting_time).map(y => new Date(y).toLocaleString())
            setStudentSavedClasses(studentClasses)
            const times = [...studentTimes, ...teacherTimes]
            // console.log(new Set(times))
            setBusyTimes([...new Set(times)])
        } else {
            toast.error('Something went wrong')
        }
    }

    useEffect(() => {
        //load teacher busy time here
        const getMembership = async () => {
            setLoading(true)
            const { status, data } = await getStudentMembership(currentUser.id)
            if (status === 200) {
                if (data.validMembership && new Date(data.validMembership) > new Date()) {
                    setMembershipStudent(data)
                    setPaidStudent(true)
                }
            } else {
                toast.error('Something went wrong, please try again later')
                // history.push('/404')
            }
            setLoading(false)
        }
        // TODO: Include busy times and classes of teacher
        const getBusyTime = async () => {
            setLoading(true)
            const { status, data } = await getTeacherBusyTime(params.teacherId)
            if (status === 200) {
                //all busy time convert to date 
                // NEED-CHECK check the localeString
                const teacherTimes = data.map(x => x.starting_time).map(y => new Date(y).toLocaleString())
                getStudentDataClasses(teacherTimes)
            } else {
                toast.error('Something went wrong, please try again later')
            }
            setLoading(false)
        }
        getMembership()
        getBusyTime()
    }, [])

    useEffect(() => {
        if (busyTimes) {
            // console.log(cloneDeep(busyTimes))
            handleSelectDate(nextDay)
        }
    }, [busyTimes])

    const handleBooking = async () => {
        if (checkMembershipBeforeBookingClass()) {
            const idStudent = JSON.parse(auth.user).id
            const startTime = new Date(
                selectedDay.setHours(Number(selectedTime.slice(0, 2)), 0, 0, 0)
            ).toISOString().split('.')[0] + "Z"
            const endTime = new Date(
                selectedDay.setHours(Number(selectedTime.slice(0, 2)) + 2, 0, 0, 0)
            ).toISOString().split('.')[0] + "Z"
            const status = await studentBookClass(idStudent, Number(params.teacherId), startTime, endTime)
            if (status === 201) {
                toast.success('Book class successfully')
                const notiMessage = "New 1-1 Class: " + "&&&" + currentUser.userName + " booked new class on " + new Date(startTime)
                await sendNotificationToUser(Number(params.teacherId), notiMessage)
                setTimeout(() => window.location.reload(), 500)
                // updateAvailableHours(selectedDay)
            } else {
                toast.error('Something wrong happened')
            }
        } else {
            toast.warn('You have booked all classes allowed in the week or your membership is invalid')
        }
    }

    const updateAvailableHours = (newValue) => {
        // console.log(newValue)
        // const test = newValue.toISOString().split('.')[0]
        // console.log(test)
        // console.log(new Date(test).toLocaleString())
        //newValue is the selected Day, not set yet, to be check first
        // const today = new Date()
        // let tomorrow = new Date()
        // tomorrow.setDate(today.getDate() + 1)
        if ((newValue.setHours(0, 0, 0, 0) >= nextDay.setHours(0, 0, 0, 0))) {
            setSelectedDay(newValue)
            //below we check if the selected day has any classes and update the hours autocomplte
            //selected day in string format
            const dayToCheck = newValue.toLocaleString().split(', ')[1]
            //days in which teacher has classes
            const busyDays = busyTimes.map(time => time.split(', ')[1])
            if (busyDays.includes(dayToCheck)) {
                // hour of booked classes, slice 0,5 to get format XX:00
                const classesInDay = busyTimes.filter(x => x.includes(dayToCheck)).map(time => time.split(', ')[0].slice(0, 5))
                // console.log(classesInDay)

                const newTimeOptions = timeOptions.filter(time => !classesInDay.includes(time))
                setAvailableHours(newTimeOptions)
                setSelectedTime(newTimeOptions[0])
            } else {
                setAvailableHours(timeOptions)
                setSelectedTime(timeOptions[0])
            }
        } else {
            toast.warn('Please select at least 3-day ahead in the future ')
        }
    }

    const handleSelectDate = (newValue) => {
        updateAvailableHours(newValue)
    }

    const checkMembershipBeforeBookingClass = () => {
        // check if membership time is still valid
        if (membershipStudent.validMembership && new Date(membershipStudent.validMembership) > new Date()) {
            if (studentSavedClasses && studentSavedClasses.length > 0) {
                //check if student has used all allowed classes in a week

                // get the selected week
                const dateBookClass = new Date(selectedDay.setHours(0, 0, 0, 0))
                const startWeek = startOfWeek(dateBookClass);
                const endWeek = endOfWeek(dateBookClass);

                // student classes convert to date type 
                const studentSavedClassesDates = studentSavedClasses.map(c => new Date(c.starting_time))

                // student classes date belong to the above selected week 
                const allSavedDateClassesInWeek = studentSavedClassesDates.filter(x => (x >= startWeek && x <= endWeek))
                if (membershipStudent.classInWeek > allSavedDateClassesInWeek.length) {
                    return true
                } else {
                    return false
                }
            } else {
                // membership is still valid and student has no class yet
                return true
            }
        } else {
            return false
        }
    }

    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : (
                    <div className={classes.root}>
                        {
                            paidStudent ? (
                                <>
                                    <GuideLineSection title={"Guideline on booking a 1-1 class"} />
                                    <div className={classes.bookingSection}>
                                        <Grid container spacing={4}>
                                            <Grid item xs={12} md={6}>
                                                <div className={classes.bookingCalendar}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <StaticDatePicker
                                                            displayStaticWrapperAs="desktop"
                                                            value={selectedDay}
                                                            onChange={(newValue) => handleSelectDate(newValue)}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                    </LocalizationProvider>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <div className={classes.chooseTime}>
                                                    <Autocomplete
                                                        disablePortal
                                                        fullWidth
                                                        id="class-start-time"
                                                        options={availableHours}
                                                        renderInput={(params) => <TextField variant="standard"  {...params} label="Select Starting Time" />}
                                                        value={selectedTime}
                                                        onChange={(e, newValue) => { setSelectedTime(newValue) }}
                                                    />
                                                    <p style={{ marginTop: '40px' }}>{'Current Selected Day: ' + selectedDay.toLocaleString().split(', ')[1]}
                                                    </p>
                                                    <p style={{ marginTop: '20px' }}>Each 1-1 class lasts for 2 hours</p>
                                                    <Button
                                                        className={classes.bookClassButton}
                                                        onClick={() => handleBooking()}
                                                        variant="outlined"
                                                    >BOOK CLASS
                                                    </Button>
                                                    <Button
                                                        className={classes.bookClassButton}
                                                        onClick={() => { history.push('/userManagement') }}
                                                        // onClick={() => checkMembershipBeforeBookingClass()}
                                                        variant="outlined"
                                                    >Check Classes
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <p style={{ marginTop: '20px' }}>You have to have a membership to be able to book class</p>
                                    <Button
                                        onClick={() => { history.push('/memberShip') }}
                                        variant="outlined"
                                    >Register Membership
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}

export default BookClass
