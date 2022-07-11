import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GuideLineSection from './createCourseComponents/guideLineSection';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Dropzone from 'react-dropzone';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';
import { cloneDeep } from 'lodash';
import { toast } from 'react-toastify';
import { getMultipleUnitPresignedUrls, uploadMultipleUnitPresignedUrls, createCourseSection, addNewUnitToDB } from 'src/services/courses.services';
import LinearProgress from '@mui/material/LinearProgress';
import { fileUrl } from 'src/utilities/shared-constants';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getAllTeachersInternal } from 'src/services/user.services';

const editIcon = (
    <EditIcon color="primary" sx={{ cursor: 'pointer' }} />
);
const deleteIcon = (
    <DeleteOutlineIcon color="primary" sx={{ cursor: 'pointer' }} />
);

const useStyles = makeStyles((theme) => ({
    root: {
    },
    formCourseSection: {
        padding: '50px',
        borderRadius: '10px',
        border: '1px solid #ccc',
    },

    formUnitSection: {
        minHeight: '1000px',
        padding: '50px',
        borderRadius: '10px',
        border: '1px solid #ccc',
    },
    videoButton: {
        marginRight: '5px'
    },
    unitButtons: {
        margin: '30px 0 50px 0',
        display: 'flex',
        justifyContent: 'center',
    },
    addNewButton: {
        "&:focus": {
            outline: 'none',
            boxShadow: 'none'
        }
    },
    zone: {
        height: '100px',
        border: "1px dotted grey",
        padding: '10px',
        "&:focus": {
            outline: 'none',
            boxShadow: 'none'
        }
    },
    fileName: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    truncate: {
        // whiteSpace: 'nowrap',
        // overflow: 'hidden',
        // textOverflow: 'ellipsis',
    },
    createCourseButton: {
        margin: '30px 0 30px 0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}))


let CreateCourse = (props) => {
    const classes = useStyles()
    const [loading, setLoading] = useState(false)

    // const helperText = 'Please fill in this field'
    const courseLevels = ['1', '2', '3', '4', '5', '6']
    const courseTypes = ['ielts', 'toeic', 'speaking', 'reading', 'writing', 'listening', 'combination']

    // const courseTeachers = [{ id: 630, name: 'Teacher1' }, { id: 631, name: 'Teacher2' }]
    const [internalTeachers, setInternalTeachers] = useState([])

    const [courseType, setCourseType] = useState('ielts')
    const [courseFree, setCourseFree] = useState(true)

    const [courseName, setCourseName] = useState('')
    const [courseNameEmpty, setCourseNameEmpty] = useState(false)

    const [courseExp, setCourseExp] = useState(0)
    const [courseExpEmpty, setCourseExpEmpty] = useState(false)

    const [courseLevel, setCourseLevel] = useState('')
    const [courseDesc, setCourseDesc] = useState('')

    const [courseTeacher, setCourseTeacher] = useState({ id: '', name: '' })
    const [courseTeacherEmpty, setCourseTeacherEmpty] = useState(false)
    const [courseImage, setCourseImage] = useState(undefined)

    const onCourseNameChange = event => {
        if (event.target.value === '') setCourseNameEmpty(true)
        else setCourseNameEmpty(false)
        setCourseName(event.target.value)
    }

    const onCourseDescChange = event => {
        setCourseDesc(event.target.value)
    }

    const onCourseLevelChange = (e, newValue) => {
        console.log(typeof newValue)
        setCourseLevel(newValue)
    }

    const onCourseExpChange = (event) => {
        if (event.target.value < 0) setCourseExp(0)
        else setCourseExp(event.target.value)
    }

    const onCourseTeacherChange = (e, newValue) => {
        if (!newValue) {
            setCourseTeacherEmpty(true)
        } else {
            console.log(newValue)
            setCourseTeacher(newValue)
        }
    }

    // UNIT SECTION
    const [unitMode, setUnitMode] = useState('add')
    const [editedUnitIndex, setEditedUnitIndex] = useState(undefined)

    const [currentUnitVideo, setCurrentUnitVideo] = useState(undefined)
    const [currentUnitFile, setCurrentUnitFile] = useState(undefined)
    const [units, setUnits] = useState([])
    const unitNameRef = useRef('')
    const unitDescriptionRef = useRef('')
    const unitOrderRef = useRef(0)

    const setInputValueUnit = (name, order, description, video, file) => {
        setCurrentUnitVideo(video)
        setCurrentUnitFile(file)
        unitOrderRef.current.value = order
        unitNameRef.current.value = name
        unitDescriptionRef.current.value = description
    }

    const addNewUnit = () => {
        const indexOrder = unitOrderRef.current.value ? unitOrderRef.current.value - 1 : units.length // -1 here because order start from 1, and index start from 0 
        const isNameUnique = !units.map(unit => unit.name).includes(unitNameRef.current.value)
        const newUnit = {
            name: unitNameRef.current.value,
            description: unitDescriptionRef.current.value,
            video: currentUnitVideo,
            file: currentUnitFile,
        }
        console.log(newUnit)
        if (newUnit.name && newUnit.description
            && newUnit.video && newUnit.file
        ) {
            if (isNameUnique) {
                const newUnits = [...units]
                newUnits.splice(indexOrder, 0, cloneDeep(newUnit))
                newUnits.forEach((unit, index) => unit.order = index + 1) // +1 here because order start from 1, and index start from 0 
                setUnits(newUnits)
                console.log(newUnits)

                //reset unit input
                setInputValueUnit('', '', '', undefined, undefined)
            } else {
                toast.warn('Name of a unit in course must be unique')
            }
        } else {
            toast.warn('Please fill all required fields')
        }
    }

    useEffect(() => {
        const getTeachers = async () => {
            const internalTeachers = await getAllTeachersInternal()
            console.log(internalTeachers)
            setInternalTeachers(internalTeachers)
        }
        getTeachers()
    }, [])

    const prepareEditUnit = (index, action) => {
        if (action === 'edit') {
            setEditedUnitIndex(index)
            setUnitMode('edit')
            const selectedUnit = units[index]
            setInputValueUnit(selectedUnit.name, selectedUnit.order, selectedUnit.description, selectedUnit.video, selectedUnit.file)
        } else if (action === 'delete') {
            const newUnits = cloneDeep(units)
            newUnits.splice(index, 1)
            setUnits(newUnits)
        }
    }

    const cancelEditUnit = () => {
        setUnitMode('add')
        setInputValueUnit('', '', '', undefined, undefined)
        setEditedUnitIndex(undefined)
    }

    const editUnitInput = () => {
        const indexOrder = unitOrderRef.current.value - 1
        const isNameUnique = unitNameRef.current.value === units[editedUnitIndex].name
            ? true
            : !units.map(unit => unit.name).includes(unitNameRef.current.value)
        if (isNameUnique) {
            const editedUnit = {
                name: unitNameRef.current.value,
                description: unitDescriptionRef.current.value,
                video: currentUnitVideo,
                file: currentUnitFile,
            }
            const editedUnits = [...units]
            editedUnits.splice(editedUnitIndex, 1)
            editedUnits.splice(indexOrder, 0, cloneDeep(editedUnit))
            editedUnits.forEach((unit, index) => unit.order = index + 1) // +1 here because order start from 1, and index start from 0 
            setUnits(editedUnits)
            cancelEditUnit()
        } else {
            toast.warn('Name of a unit in course must be unique')
        }

    }

    const testFunc = () => {
        console.log(cloneDeep(courseExp))
    }

    const createNewCourse = async () => {
        const courseUnits = cloneDeep(units)
        const newCourse = cloneDeep({
            courseName,
            courseExp,
            courseLevel,
            courseDesc,
            courseTeacher: courseTeacher.id,
            courseType,
            courseIsFree: courseFree,
        })
        console.log(newCourse)
        console.log(courseUnits)
        if (newCourse.courseName && newCourse.courseExp && newCourse.courseLevel && newCourse.courseTeacher && newCourse.courseType && courseImage && courseUnits.length > 0) {
            setLoading(true)
            const imageUrl = await getMultipleUnitPresignedUrls([newCourse.courseName + "_Image"], 'image')
            const statusImage = await uploadMultipleUnitPresignedUrls([courseImage], imageUrl, 'image')
            if (statusImage[0].status === "fulfilled") {
                const imageURL_DB = fileUrl + newCourse.courseName + "_Image"
                newCourse.courseImageUrl = imageURL_DB

                // send data to create course (not unit) here, except for courseImage
                const courseStatus = await createCourseSection(newCourse)

                // after course being created, send data upload unit files and then create unit
                if (courseStatus.message === "create successfully") {
                    const courseId = courseStatus.newCourse.id

                    // create names to store in AWS S3
                    let fileNamesForVideoUrls = []
                    let fileNamesForPdfUrls = []

                    courseUnits.forEach(unit => {
                        fileNamesForVideoUrls.push(newCourse.courseName + "_Video_" + unit.name)
                        fileNamesForPdfUrls.push(newCourse.courseName + "_Pdf_" + unit.name)
                    })

                    // get all files for uploading
                    const videos = courseUnits.map(unit => unit.video)
                    const pdfs = courseUnits.map(unit => unit.file)

                    // get uploads urls for each type of file
                    // TODO NOTE: FOR NOW PDF IS SET TO IMAGE TYPE, CHANGE LATER
                    const videoUrls = await getMultipleUnitPresignedUrls(fileNamesForVideoUrls, 'video')
                    const pdfUrls = await getMultipleUnitPresignedUrls(fileNamesForPdfUrls, 'pdf')

                    //upload files
                    const statusesVideo = await uploadMultipleUnitPresignedUrls(videos, videoUrls, 'video')
                    const statusesPdf = await uploadMultipleUnitPresignedUrls(pdfs, pdfUrls, 'pdf')
                    console.log(statusesVideo)
                    console.log(statusesPdf)

                    // SAVE UNIT HERE
                    if (!statusesVideo.map(item => item.status).includes('rejected')) {
                        let DBfileNamesForVideoUrls = []
                        let DBfileNamesForPdfUrls = []
                        let toBeSaveUnits = []
                        courseUnits.forEach((unit) => {
                            const toBeSaveUnit = {
                                name: unit.name,
                                video_url: fileUrl + newCourse.courseName + "_Video_" + unit.name,
                                file_url: fileUrl + newCourse.courseName + "_Pdf_" + unit.name,
                                order: unit.order,
                                description: unit.description
                            }
                            toBeSaveUnits.push(toBeSaveUnit)
                        })

                        for (const saveUnit of toBeSaveUnits) {
                            const data = await addNewUnitToDB(saveUnit, courseId)
                            console.log(data)
                        }
                        setLoading(false)
                        toast.success('Created course successfully')
                    }

                    // TODO NEED TO IDENTIFY ERROR FILE BEFORE SAVING UNIT TO BACKEND
                }
            } else {
                setLoading(false)
                toast.error('Error creating course')
            }
        } else {
            toast.warn('Please fill all required fields')
        }
    }

    return (
        <>
            <div className={`${classes.root}`}>
                {
                    loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
                }
                <GuideLineSection />
                <div className={`${classes.formCourseSection}`}>
                    <Grid container alignItems="center" spacing={4}>
                        <Grid item xs={12} md={5}>
                            <TextField
                                id="name-course"
                                label="Course's name"
                                variant="standard"
                                value={courseName}
                                required
                                // error={courseNameEmpty}
                                // helperText={courseNameEmpty ? helperText : ''}
                                fullWidth
                                onChange={e => onCourseNameChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <Autocomplete
                                disablePortal
                                fullWidth
                                id="level-course"
                                options={courseLevels}
                                renderInput={(params) => <TextField variant="standard"  {...params} label="Level" />}
                                value={courseLevel}
                                onChange={(e, newValue) => onCourseLevelChange(e, newValue)}
                            />
                        </Grid>
                        <Grid item xs={12} md={1}>
                            <TextField
                                id="exp-course"
                                label="Course's Exp"
                                variant="standard"
                                value={courseExp}
                                fullWidth
                                onChange={e => onCourseExpChange(e)}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                disablePortal
                                id="teacher-course"
                                options={internalTeachers}
                                getOptionLabel={option => option.firstName + ' ' + option.lastName}
                                // sx={{ width: 300 }}
                                renderInput={(params) => <TextField  {...params} label="Choose a teacher" />}
                                // value={courseTeacher}
                                required
                                // error={courseTeacherEmpty}
                                // helperText={courseTeacherEmpty ? helperText : ''}
                                onChange={(e, newValue) => onCourseTeacherChange(e, newValue)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Autocomplete
                                disablePortal
                                id="course-type"
                                options={courseTypes}
                                // getOptionLabel={option => option.name}
                                renderInput={(params) => <TextField  {...params} label="Choose a type" />}
                                value={courseType}
                                required
                                onChange={(e, newValue) => setCourseType(newValue)}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            defaultChecked
                                            onChange={e => {
                                                setCourseFree(e.target.checked)
                                            }}
                                        />
                                    } label="Free" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="description-course"
                                placeholder="Enter Course's description"
                                multiline
                                rows={4}
                                value={courseDesc}
                                onChange={e => onCourseDescChange(e)}
                                // maxRows={20}
                                fullWidth
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <section className={`${classes.zone}`}>
                                <Dropzone onDrop={acceptedFiles => {
                                    if (acceptedFiles.length > 0) {
                                        console.log(acceptedFiles)
                                        setCourseImage(acceptedFiles[0])
                                    }
                                }}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop Course Image here, or click to select Image (only one)</p>
                                                <p className={`${classes.fileName}`} >{courseImage ? courseImage.name : 'No selected image'}</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </section>
                        </Grid>
                    </Grid>
                </div>
                <hr></hr>
                <div className={`${classes.formUnitSection}`}>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TextField
                                id="name-unit"
                                placeholder="Enter Unit's Name"
                                fullWidth
                                inputRef={unitNameRef}
                                variant='standard'
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="order-unit"
                                placeholder="Unit's order"
                                variant='standard'
                                type='number'
                                fullWidth
                                inputRef={unitOrderRef}
                                InputProps={{ inputProps: { min: 1, max: units.length + 1 } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="description-unit"
                                placeholder="Enter Unit's description"
                                multiline
                                rows={4}
                                fullWidth
                                variant="filled"
                                inputRef={unitDescriptionRef}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <section className={`${classes.zone}`}>
                                <Dropzone maxFiles={1} onDrop={acceptedFiles => {
                                    if (acceptedFiles.length > 0) {
                                        console.log(acceptedFiles)
                                        setCurrentUnitVideo(acceptedFiles[0])
                                    }
                                }}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop Unit Video here, or click to select video (only one)</p>
                                                <p className={`${classes.fileName}`} >{currentUnitVideo ? currentUnitVideo.name : 'No selected video'}</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </section>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <section className={`${classes.zone}`}>
                                <Dropzone onDrop={acceptedFiles => {
                                    if (acceptedFiles.length > 0) {
                                        console.log(acceptedFiles)
                                        setCurrentUnitFile(acceptedFiles[0])
                                    }
                                }}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop Unit File here, or click to select File (only one)</p>
                                                <p className={`${classes.fileName}`} >{currentUnitFile ? currentUnitFile.name : 'No selected file'}</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </section>
                        </Grid>
                    </Grid>
                    <div className={classes.unitButtons}>
                        <Button className={classes.addNewButton} onClick={() => {
                            if (unitMode === 'add') { addNewUnit() }
                            else { editUnitInput() }
                        }} sx={{ margin: '0 20px 0 20px' }} variant="outlined">{(unitMode === 'add') ? 'ADD UNIT' : 'EDIT UNIT'}</Button>
                        {
                            (unitMode === 'edit') ? (
                                <Button
                                    sx={{ margin: '0 20px 0 20px' }}
                                    className={classes.addNewButton}
                                    onClick={() => cancelEditUnit()}
                                    variant="outlined">
                                    CANCEL EDIT
                                </Button>
                            ) : null
                        }
                    </div>



                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Description</TableCell>
                                    <TableCell align="center">Video&nbsp;Title</TableCell>
                                    <TableCell align="center">File&nbsp;Title</TableCell>
                                    <TableCell align="center">Edit</TableCell>
                                    <TableCell align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {units.map((row, index) => (
                                    <TableRow
                                        key={row.order}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <Tooltip title={row.order} >
                                                <span className={classes.truncate}>{row.order}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title={row.name} >
                                                <span className={classes.truncate}>{row.name}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.description} >
                                                <span className={classes.truncate}>{row.description}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.video?.name} >
                                                <span className={classes.truncate}>{row.video?.name}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.file?.name} >
                                                <span className={classes.truncate}>{row.file?.name}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell onClick={() => prepareEditUnit(index, 'edit')} align="center">{editIcon}</TableCell>
                                        <TableCell onClick={() => prepareEditUnit(index, 'delete')} align="center">{deleteIcon}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={classes.createCourseButton}>
                    <Button className={classes.addNewButton} onClick={() => createNewCourse()} variant="outlined">CREATE COURSE</Button>
                </div>
                {
                    loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
                }
                {/* <Button className={classes.addNewButton} onClick={() => testFunc()} variant="outlined">test</Button> */}
            </div>
        </>
    )
}


export default CreateCourse