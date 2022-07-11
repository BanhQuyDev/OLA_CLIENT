import React, { useEffect, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from "@material-ui/core/styles";
import { Row, Col } from 'reactstrap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { getAllTeachersType, getAllTeachersInternal } from '../../../services/user.services'
import { searchCourseQuery } from "src/services/courses.services";

const useStyles = makeStyles((theme) => ({

    searchContainer: {
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px'
    },
}))
const allLevel = [
    { label: 'A1', value: '1' },
    { label: 'A2', value: '2', },
    { label: 'B1', value: '3', },
    { label: 'B2', value: '4', },
    { label: 'C1', value: '5', },
    { label: 'C2', value: '6', }
]

export default function SearchCourseArea(props) {
    const classes = useStyles();

    const [level, setLevel] = useState({ label: '', value: '' })
    const [courseName, setCourseName] = useState('')
    const [teachers, setTeachers] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState({ id: '', firstName: '', lastName: '', type: '' })
    useEffect(() => {
        const getTeachers = async () => {
            const internalTeachers = await getAllTeachersInternal()
            console.log(internalTeachers)
            setTeachers(internalTeachers)
        }
        getTeachers()
    }, [])

    const setValues = (name, level, teacher) => {
        setSelectedTeacher(teacher)
        setLevel(level)
        setCourseName(name)
    }


    const handleSearch = async () => {
        const teacherQuery = selectedTeacher ? selectedTeacher.id : ''
        const levelQuery = level ? level.value : ''
        const courseNameQuery = courseName ? courseName : ''

        const query = `?teacherId=${teacherQuery}&courseLevel=${levelQuery}&courseName=${courseNameQuery}`
        const newCourses = await searchCourseQuery(query)
        props.setDataFeature(newCourses)
        // setValues('', { label: '', value: '' }, { id: '', firstName: '', lastName: '', type: '' })
    }

    const handleResetSearch = async () => {
        const query = `?teacherId=&courseLevel=&courseName=`
        const newCourses = await searchCourseQuery(query)
        props.setDataFeature(newCourses)
        // setValues('', { label: '', value: '' }, { id: '', firstName: '', lastName: '', type: '' })
    }


    return (
        <div className={classes.searchContainer}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Course's filter</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Row>
                        <Col xs='6' md='6' lg='3'>
                            <Autocomplete
                                // value={level}
                                onChange={(e, value) => { setLevel(value) }}
                                disablePortal
                                options={allLevel}
                                getOptionLabel={option => option.label}
                                renderInput={(params) => <TextField {...params} label="Choose Level" variant="standard" />}
                            />
                        </Col>
                        <Col xs='6' md='6' lg='3'>
                            <TextField
                                // value={courseName}
                                onChange={(e) => { setCourseName(e.target.value) }}
                                id="search_course_name"
                                label="Course Name"
                                variant="standard"
                                fullWidth />
                        </Col>
                        <Col xs='6' md='6' lg='3'>
                            <Autocomplete
                                // value={selectedTeacher}
                                onChange={(e, value) => { setSelectedTeacher(value) }}
                                disablePortal
                                options={teachers}
                                renderOption={(props, option) => (
                                    <li {...props} key={option.id}>{option.firstName + " " + option.lastName}</li>
                                )}
                                getOptionLabel={option => option.id ? option.firstName + " " + option.lastName : ""}
                                renderInput={(params) => <TextField {...params} label="Choose Teacher" variant="standard" />}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm="12" md={{ size: 1, offset: 11 }}>
                            <Stack spacing={2} direction="row">
                                {/* <Button onClick={()=>handleResetSearch()} variant="outlined">RESET</Button> */}
                                <Button
                                    onClick={() => handleSearch()}
                                    style={{
                                        backgroundColor: '#5ca9fb',
                                    }}
                                    variant="contained">Search</Button>
                            </Stack>
                        </Col>
                    </Row>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}