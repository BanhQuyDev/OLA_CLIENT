import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { getAllTeachersExternal } from 'src/services/user.services';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import TeacherCard from './teacherComponents/teacherCard';
import { allCountries } from '../users/countriesData';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { cloneDeep } from 'lodash';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    searchTeacher: {
        "&:focus": {
            outline: 'none',
            boxShadow: 'none'
        }
    },

    searchTeacherSection: {
        paddingLeft: '60px'
    },

    teachersSection: {
        paddingTop: '80px',
        paddingLeft: '60px',
        paddingRight: '60px',
    },
}))

const allMajors = ['Speaking Trainer', 'Writing Trainer', 'Ielts Trainer', 'Toeic Trainer', 'Workplace English Trainer', 'Casual Trainer']
// const allCountriesToShow = ['All', ...(allCountries.map(c=>c.name))]
const allCountriesToShow = [...allCountries.map(c => c.name)]

const ViewAllTeacher = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [allTeachers, setAllTeachers] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [feedbackTeachers, setFeedbackTeachers] = useState([])
    const [currentMajor, setCurrentMajor] = useState('')
    const [currentNation, setCurrentNation] = useState('')


    useEffect(() => {
        const getTeachers = async () => {
            setLoading(true)
            const externalTeachers = await getAllTeachersExternal()
            console.log(externalTeachers)
            setAllTeachers(externalTeachers.teacherList)
            setTeachers(externalTeachers.teacherList)
            setFeedbackTeachers(externalTeachers.feedbackList)
            setLoading(false)
        }
        getTeachers()
    }, [])

    const searchTeacher = () => {
        setLoading(true)
        setTimeout(()=> {
            if (!searchQuery && !currentMajor && !currentNation) {
                setTeachers(allTeachers)
                setLoading(false)
                return
            }
            let newTeachers = [...allTeachers]
            if (searchQuery) {
                newTeachers = newTeachers.filter(t => (t.firstName + ' ' + t.lastName).toLowerCase().includes(searchQuery.toLowerCase()))
            }
    
            if (currentMajor) {
                newTeachers = newTeachers.filter(t => t.major === currentMajor)
            }
    
            if (currentNation) {
                newTeachers = newTeachers.filter(t => t.nationality === currentNation)
            }
    
            setTeachers([...newTeachers])
            setLoading(false)
        }, 500)
    }

    const handleChangeMajor = (value) => {
        setCurrentMajor(value)
    }

    const handleChangeNation = (value) => {
        setCurrentNation(value)
    }

    // const handleClearSearch = () => {
    //     setSearchQuery('')
    //     setCurrentMajor('')
    //     setCurrentNation('')
    // }

    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
            }
            <div className={classes.root}>
                <div className={`${classes.searchTeacherSection}`}>
                    <div style={{
                        width: '100%',
                        marginTop: '20px',
                        marginBottom: '20px'
                    }}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Teachers filter</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid
                                    container spacing={4}
                                    alignItems="center"
                                >
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            id="name-external-teacher"
                                            label="Teacher's name"
                                            variant="standard"
                                            value={searchQuery}
                                            fullWidth
                                            onChange={e => setSearchQuery(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Autocomplete
                                            disablePortal
                                            options={allMajors}
                                            // getOptionLabel={option => option.name}
                                            renderInput={(params) => <TextField variant="standard" {...params} label="Choose a major" />}
                                            // inputValue={currentMajor}
                                            // value={currentMajor}
                                            onChange={(e, newValue) => handleChangeMajor(newValue)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Autocomplete
                                            disablePortal
                                            options={allCountriesToShow}
                                            // getOptionLabel={option => option.name}
                                            renderInput={(params) => <TextField variant="standard"  {...params} label="Choose a nationality" />}
                                            // inputValue={currentNation}
                                            // value={currentNation}
                                            onChange={(e, newValue) => handleChangeNation(newValue)}
                                        />
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid
                                    container spacing={4}
                                    alignItems="center"
                                    flexDirection="row-reverse"
                                    justifyContent='end'
                                >
                                    <Grid item xs={12} md={1}>
                                        <Button
                                            // fullWidth
                                            style={{
                                                // marginRight: '10px',
                                                // paddingRight: '40px',
                                                // paddingLeft: '40px',
                                                color: 'white',
                                                backgroundColor: '#5ca9fb',
                                            }}
                                            onClick={() => searchTeacher()}
                                        >
                                            Search
                                        </Button>
                                    </Grid>
                                    {/* <Grid item xs={12} md={1}>
                                        <Button fullWidth variant="outlined" onClick={() => handleClearSearch()}>Clear</Button>
                                    </Grid> */}
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                <br></br>
                <div className={`${classes.teachersSection}`}>
                    <Grid container spacing={12}>
                        {teachers.map(teacher => (
                            <Grid key={teacher.id} item xs={12} md={6} lg={4}>
                                <TeacherCard teacherInfo={teacher} feedbackTeachers={feedbackTeachers} />
                            </Grid>
                        ))}

                    </Grid>
                </div>

            </div>
        </>
    )
}

export default ViewAllTeacher
