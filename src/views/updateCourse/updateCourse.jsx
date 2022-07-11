import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { getMultipleUnitPresignedUrls, uploadMultipleUnitPresignedUrls, getUpdateCourseSection, updateCourseSection } from 'src/services/courses.services';
import LinearProgress from '@mui/material/LinearProgress';
import { fileUrl } from 'src/utilities/shared-constants';
import { useParams } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getAllTeachersInternal } from 'src/services/user.services';
import { createUnitWhenUpdateCourse, deleteUnit, updatedUnitInCourse } from 'src/services/courses.services';

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
    updateCourseButton: {
        margin: '30px 0 30px 0',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}))


let UpdateCourse = (props) => {
    const classes = useStyles()
    let { updateCourseId } = useParams();
    const [loading, setLoading] = useState(false)

    // const helperText = 'Please fill in this field'
    const courseLevels = ['1', '2', '3', '4', '5', '6']
    const courseTypes = ['ielts', 'toeic', 'speaking', 'reading', 'writing', 'listening', 'combination']

    // const courseTeachers = [{ id: 630, name: 'Teacher1' }, { id: 631, name: 'Teacher2' }]
    const [internalTeachers, setInternalTeachers] = useState([])

    const [courseType, setCourseType] = useState('ielts')
    const [courseFree, setCourseFree] = useState(true)
    const [courseId, setCourseId] = useState(undefined)
    const [courseName, setCourseName] = useState('')
    const [courseExp, setCourseExp] = useState(0)
    const [courseLevel, setCourseLevel] = useState('6')
    const [courseDesc, setCourseDesc] = useState('')
    const [courseTeacher, setCourseTeacher] = useState({ id: '', name: '' })
    const [courseImage, setCourseImage] = useState(undefined)
    const [courseImageDBUrl, setCourseImageDBUrl] = useState('')
    const [savedCourse, setSavedCourse] = useState({})

    const onCourseNameChange = event => {
        setCourseName(event.target.value)
    }

    const onCourseDescChange = event => {
        setCourseDesc(event.target.value)
    }

    const onCourseLevelChange = (e, newValue) => {
        setCourseLevel(newValue)
    }

    const onCourseExpChange = (event) => {
        if (event.target.value < 0) setCourseExp(0)
        else setCourseExp(event.target.value)
    }

    const onCourseTeacherChange = (e, newValue) => {
        if (newValue) {
            setCourseTeacher(newValue)
        }
    }

    const setInputValueCourse = (name, exp, description, level, type, isFree, teacher) => {
        setCourseName(name)
        setCourseDesc(description)
        setCourseExp(exp)
        setCourseLevel(level)
        setCourseTeacher(teacher)
        setCourseType(type)
        setCourseFree(isFree)
        // setUnits(units)
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
    const unitEstimatedTimeRef = useRef(0)

    useEffect(() => {
        const getCourseData = async (updateCourseId) => {
            //TODO NOT-SURE test if set teacher works correctly
            const internalTeachers = await getAllTeachersInternal()
            console.log(internalTeachers)
            setInternalTeachers(internalTeachers)
            const data = await getUpdateCourseSection(updateCourseId)
            if (data.id) {
                console.log(data)
                setSavedCourse(data)
                const { name, exp, description, level, type, isFree, id_internal_member } = data
                setInputValueCourse(name, exp, description, level.toString(), type, isFree, internalTeachers.find(t => t.id === id_internal_member))
                const updatedUnits = cloneDeep(data.units).sort((a, b) => parseInt(a.order) - parseInt(b.order));
                setUnits(updatedUnits)
            }
        }
        getCourseData(updateCourseId)
    }, []);

    const setInputValueUnit = (name, order, description, video, file) => {
        setCurrentUnitVideo(video)
        setCurrentUnitFile(file)
        // unitEstimatedTimeRef.current.value = estimatedTime
        unitOrderRef.current.value = order
        unitNameRef.current.value = name
        unitDescriptionRef.current.value = description
    }

    const addNewUnit = async () => {
        const indexOrder = unitOrderRef.current.value ? unitOrderRef.current.value - 1 : units.length // -1 here because order start from 1, and index start from 0 
        const isNameUnique = !units.map(unit => unit.name).includes(unitNameRef.current.value)
        const newUnit = {
            name: unitNameRef.current.value,
            description: unitDescriptionRef.current.value,
            video: currentUnitVideo,
            file: currentUnitFile,
            order: indexOrder + 1,
            // estimatedTime: unitEstimatedTimeRef.current.value
        }
        console.log(newUnit)
        if (newUnit.name && newUnit.description
            && newUnit.video && newUnit.file
        ) {
            if (isNameUnique) {
                setLoading(true)
                // create names to store in AWS S3
                let fileNameForVideoUrl = [savedCourse.name + "_Video_" + newUnit.name]
                let fileNameForPdfUrl = [savedCourse.name + "_Pdf_" + newUnit.name]

                // get uploads urls for each type of file
                // TODO NOTE: FOR NOW PDF IS SET TO IMAGE TYPE, CHANGE LATER
                const videoUrl = await getMultipleUnitPresignedUrls(fileNameForVideoUrl, 'video')
                const pdfUrl = await getMultipleUnitPresignedUrls(fileNameForPdfUrl, 'pdf')

                //upload files
                const statusesVideo = await uploadMultipleUnitPresignedUrls([newUnit.video], videoUrl, 'video')
                const statusesPdf = await uploadMultipleUnitPresignedUrls([newUnit.file], pdfUrl, 'pdf')
                console.log(statusesVideo)
                console.log(statusesPdf)

                const unitVideoDBUrl = fileUrl + fileNameForVideoUrl[0]
                const unitPdfDBUrl = fileUrl + fileNameForPdfUrl[0]

                // TODO NEED TO IDENTIFY ERROR FILE BEFORE SAVING UNIT TO BACKEND

                //reset unit input
                // SAVE UNIT HERE
                if (!statusesVideo.map(item => item.status).includes('rejected')) {
                    const toBeSaveUnit = {
                        name: newUnit.name,
                        video_url: fileUrl + savedCourse.name + "_Video_" + newUnit.name,
                        file_url: fileUrl + savedCourse.name + "_Pdf_" + newUnit.name,
                        order: newUnit.order,
                        description: newUnit.description
                    }

                    const { status, data } = await createUnitWhenUpdateCourse(toBeSaveUnit, savedCourse.id)
                    console.log(status)
                    console.log(data)
                    if (status === 201) {
                        setInputValueUnit('', '', '', undefined, undefined)
                        toast.success('Added unit successfully, you might need to reload if data has not been shown')
                        const courseData = await getUpdateCourseSection(updateCourseId)
                        if (courseData.id) {
                            const updatedUnits = cloneDeep(courseData.units).sort((a, b) => parseInt(a.order) - parseInt(b.order));
                            setUnits(updatedUnits)
                        }
                    } else {
                        toast.error("Something went wrong")
                    }
                } else {
                    toast.error("Something went wrong while saving unit info")
                }
                setLoading(false)
            } else {
                toast.warn('Name of a unit in course must be unique')
            }
        } else {
            toast.warn('Please fill all required fields')
        }
    }

    const prepareEditUnit = (index, action) => {
        if (action === 'edit') {
            setEditedUnitIndex(index)
            setUnitMode('edit')
            const selectedUnit = units[index]
            setInputValueUnit(selectedUnit.name, selectedUnit.order, selectedUnit.description, undefined, undefined, 
                // selectedUnit.estimatedTime
                )
        } else if (action === 'delete') {
            handleDeleteUnit(units[index].id)
        }
    }

    const handleDeleteUnit = async (unitId) => {
        setLoading(true)
        const { status } = await deleteUnit(unitId)
        if (status === 200) {
            toast.success('Deleted unit successfully')
            const courseData = await getUpdateCourseSection(updateCourseId)
            console.log(courseData)
            if (courseData.id) {
                const updatedUnits = cloneDeep(courseData.units).sort((a, b) => parseInt(a.order) - parseInt(b.order));
                console.log(updatedUnits)
                setUnits(updatedUnits)
            }
        } else {
            toast.error('Something went wrong')
        }
        setLoading(false)
        console.log(unitId)
    }

    const cancelEditUnit = () => {
        setUnitMode('add')
        setInputValueUnit('', '', '', undefined, undefined)
        setEditedUnitIndex(undefined)
    }

    const editUnitInput = async () => {
        const isNameUnique = unitNameRef.current.value === units[editedUnitIndex].name
            ? true
            : !units.map(unit => unit.name).includes(unitNameRef.current.value)

        if (isNameUnique) {
            setLoading(true)
            const indexOrder = unitOrderRef.current.value - 1
            const editedUnitOrder = unitOrderRef.current.value > units.length ? units.length : unitOrderRef.current.value
            const newVideo = currentUnitVideo
            const newFile = currentUnitFile

            const editedUnit = {
                name: unitNameRef.current.value,
                description: unitDescriptionRef.current.value,
                order: editedUnitOrder,
                type: 'abc',
                video_url: units[editedUnitIndex].video_url,
                file_url: units[editedUnitIndex].file_url,
                id_course: savedCourse.id
                // estimatedTime: unitEstimatedTimeRef.current.value,
            }

            if (newVideo) {
                let fileNameForVideoUrl = [savedCourse.name + "_Video_" + editedUnit.name]
                const videoUrl = await getMultipleUnitPresignedUrls(fileNameForVideoUrl, 'video')
                const statusVideo = await uploadMultipleUnitPresignedUrls([newVideo], videoUrl, 'video')

                if (statusVideo[0].status === "fulfilled") {
                    editedUnit.video_url = fileUrl + fileNameForVideoUrl[0]
                } else {
                    toast.error('Something when wrong while uploading video')
                }
            }
            if (newFile) {
                let fileNameForPdfUrl = [savedCourse.name + "_Pdf_" + editedUnit.name]
                const pdfUrl = await getMultipleUnitPresignedUrls(fileNameForPdfUrl, 'pdf')
                const statusPdf = await uploadMultipleUnitPresignedUrls([newFile], pdfUrl, 'pdf')

                if (statusPdf[0].status === "fulfilled") {
                    editedUnit.file_url = fileUrl + fileNameForPdfUrl[0]
                } else {
                    toast.error('Something when wrong while uploading file')
                }
            }

            //call api to update unit
            const { status, data } = await updatedUnitInCourse(editedUnit, units[editedUnitIndex].id)
            if (status === 200 && data.newUpdateUnit?.id) {
                toast.success('Edited unit successfully')
                //call api to get all unit and set unit
                const courseData = await getUpdateCourseSection(updateCourseId)
                if (courseData.id) {
                    const updatedUnits = cloneDeep(courseData.units).sort((a, b) => parseInt(a.order) - parseInt(b.order));
                    setUnits(updatedUnits)
                }
            }
            setLoading(false)
            cancelEditUnit()
        } else {
            toast.warn('Name of a unit in course must be unique')
        }
    }

    const testFunc = () => {
        console.log(cloneDeep(savedCourse))
    }

    const updateNewCourse = async () => {
        const newCourse = cloneDeep({
            courseName,
            courseExp,
            courseDesc,
            courseLevel,
            courseTeacher: courseTeacher.id,
            courseType,
            courseIsFree: courseFree
        })
        if (newCourse.courseName && newCourse.courseExp && newCourse.courseLevel && newCourse.courseTeacher && newCourse.courseType) {
            setLoading(true)
            let statusImage
            let imageURL_DB
            if (courseImage) {
                const imageUrl = await getMultipleUnitPresignedUrls([newCourse.courseName + "_Image"], 'image')
                statusImage = await uploadMultipleUnitPresignedUrls([courseImage], imageUrl, 'image')
            }
            if (statusImage && statusImage[0].status !== "fulfilled") {
                toast.error('Error uploading new image')
            }
            if (statusImage && statusImage[0].status === "fulfilled") {
                imageURL_DB = fileUrl + newCourse.courseName + "_Image"
                newCourse.courseImageUrl = imageURL_DB
            } else {
                newCourse.courseImageUrl = savedCourse.image
            }
            const data = await updateCourseSection(newCourse, updateCourseId)
            console.log(data)
            setSavedCourse(data.newCourseUpdate)

            setLoading(false)
            toast.success('Updated Course Successfully')

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
                <div className={`${classes.formCourseSection}`}>
                    <Grid container alignItems="center" spacing={4}>
                        <Grid item xs={12} md={5}>
                            <TextField
                                id="name-course"
                                label="Course's name"
                                variant="standard"
                                value={courseName}
                                required
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
                                renderInput={(params) => <TextField required variant="standard"  {...params} label="Level" />}
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
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Autocomplete
                                disablePortal
                                id="teacher-course"
                                options={internalTeachers}
                                getOptionLabel={option => option.firstName + ' ' + option.lastName}
                                renderInput={(params) => <TextField required  {...params} label="Choose a teacher" />}
                                value={courseTeacher}
                                required
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
                                            value={courseFree}
                                            checked={courseFree}
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
                                                <p>Drag 'n' drop Course Image here, or click to select Image (only one) *</p>
                                                <p className={`${classes.fileName}`} >{courseImage ? courseImage.name : 'No selected image'}</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </section>
                        </Grid>
                    </Grid>
                    <div className={classes.updateCourseButton}>
                        <Button className={classes.addNewButton} onClick={() => updateNewCourse()} variant="outlined">update COURSE</Button>
                    </div>
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
                        {/* <Grid item xs={2}>
                            <TextField
                                id="order-time-learn"
                                placeholder="Estimated time"
                                variant='standard'
                                type='number'
                                fullWidth
                                inputRef={unitEstimatedTimeRef}
                                InputProps={{ inputProps: { min: 1 } }}
                            />
                        </Grid> */}
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
                                    <TableCell align="center">Video&nbsp;URL</TableCell>
                                    <TableCell align="center">File&nbsp;URL</TableCell>
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
                                        <TableCell align="center" width={100}>
                                            <Tooltip title={row.video_url} >
                                                <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => window.open(row.video_url, "_blank")} className={classes.truncate}>{row.video_url}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Tooltip title={row.file_url} >
                                                <span style={{color: 'blue', cursor: 'pointer'}} onClick={() => window.open(row.file_url, "_blank")} className={classes.truncate}>{row.file_url}</span>
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
                {
                    loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
                }
                {/* <Button className={classes.addNewButton} onClick={() => testFunc()} variant="outlined">test</Button> */}
            </div>
        </>
    )
}


export default UpdateCourse