import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuthContext } from 'src/context/AuthContext';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { getAllCourse } from '../../services/courses.services'
import { updateOneCoursePath } from 'src/services/coursesPath.services';
import { getOneCoursePath } from '../../services/courses.services';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
    },
    tableSection: {
        marginTop: '50px',
        padding: '50px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        backgroundColor: 'white'
    },
}))

const UpdateCoursePath = () => {
    const classes = useStyles();
    const params = useParams()
    const auth = useAuthContext()
    const currentUser = JSON.parse(auth.user)
    const [loading, setLoading] = useState(false)
    const [coursesInPath, setCoursesInPath] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [allCoursesOriginal, setAllCoursesOriginal] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState({});
    const [savedId, setSavedId] = useState(undefined);
    const pathNameRef = useRef('')
    const pathDescriptionRef = useRef('')

    const handleDragEnd = (e) => {
        if (!e.destination) return;
        let tempData = Array.from(coursesInPath);
        let [source_data] = tempData.splice(e.source.index, 1);
        tempData.splice(e.destination.index, 0, source_data);
        setCoursesInPath(tempData);
    };

    const handleAddCourse = () => {
        if (selectedCourse && selectedCourse.id) {
            const newTable = [...coursesInPath]
            newTable.push(
                {
                    id: selectedCourse.id,
                    name: selectedCourse.name,
                    level: selectedCourse.level,
                    // teacher: selectedCourse.firstName + ' ' + selectedCourse.lastName,
                    status: selectedCourse.isFree ? 'Free' : 'Paid',
                    exp: selectedCourse.exp
                }
            )
            setCoursesInPath(newTable)
        }

    }

    const handleUpdatePath = async () => {
        const pathName = pathNameRef.current.value
        const pathDesc = pathDescriptionRef.current.value
        if (pathName && pathDesc && coursesInPath.length > 0) {
            let groupCourse = []
            coursesInPath.forEach((item, idx) => {
                groupCourse.push(
                    {
                        courseID: item.id,
                        order: idx + 1
                    }
                )
            })
            const pathObject = {
                idCoursePath: savedId,
                idAdmin: currentUser.id,
                name: pathName,
                desc: pathDesc,
                groupCourse
            }
            console.log(pathObject)
            setLoading(true)
            const { status, data } = await updateOneCoursePath(pathObject)
            if (status === 200) {
                toast.success('Updated Successfully')
                setLoading(false)
                getPathData()
            } else {
                setLoading(false)
                toast.error('Something wrong happened')
            }
        } else {
            toast.warn('Please fill all required fields')
        }
    }

    const handleCourseSelection = (newValue) => {
        setSelectedCourse(newValue)
        if (newValue) {
            const newCourses = [...allCourses.filter(course => course.id !== newValue.id)]
            setAllCourses(newCourses)
        }
    }

    const handleRemoveCourse = (removeId, idx) => {
        if (idx > -1) {
            const updatedPath = [...coursesInPath]
            updatedPath.splice(idx, 1);
            setCoursesInPath(updatedPath)
        }
        const removedCourse = allCoursesOriginal.find(course => course.id === removeId)
        if (removedCourse) {
            const newCourses = [...allCourses, removedCourse]
            setAllCourses(newCourses)
        }
    }

    const getPathData = async () => {
        setLoading(true)
        const { status, data } = await getOneCoursePath(params.pathId)
        if (status === 200) {
            setLoading(false)
            setSavedId(data.coursePath.id)
            pathNameRef.current.value = data.coursePath.name
            pathDescriptionRef.current.value = data.coursePath.desc
            let courseTable = []
            console.log(data)
            data.groupCourse.forEach((course, idx) => {
                const c_in_path = {
                    id: course.course_template.id,
                    name: course.course_template.name,
                    level: course.course_template.level,
                    // teacher: course.course_template.firstName + ' ' + course.course_template.lastName,
                    status: course.course_template.isFree ? 'Free' : 'Paid',
                    exp: course.course_template.exp
                }
                courseTable.push(c_in_path)
            })
            setCoursesInPath(courseTable)
            const newCourses = [...allCoursesOriginal.filter(course => !courseTable.map(c => c.id).includes(course.id))]
            setAllCourses(newCourses)
        } else {
            toast.error('Something wrong happened')
        }
    }

    useEffect(() => {
        const getCourseData = async () => {
            setLoading(true)
            const allCoursesData = await getAllCourse()
            if (allCoursesData.courseList) {
                setLoading(false)
                setAllCoursesOriginal(allCoursesData.courseList)
                setAllCourses(allCoursesData.courseList)
            } else {
                toast.error('Something wrong happened')
            }
        }
        getCourseData()
    }, [])

    useEffect(() => {
        getPathData()
    }, [allCoursesOriginal])

    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : (
                    <div className="root">
                        <div className={`${classes.formCourseSection}`}>
                            <Grid container alignItems="center" spacing={4}>
                                <Grid item xs={12}>
                                    <h5>Add Path Detail</h5>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <TextField
                                        id="name-path"
                                        label="Path's name"
                                        variant="standard"
                                        required
                                        fullWidth
                                        inputRef={pathNameRef}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="description-path"
                                        placeholder="Enter path's description"
                                        multiline
                                        rows={4}
                                        required
                                        fullWidth
                                        variant="filled"
                                        inputRef={pathDescriptionRef}
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            <Grid container alignItems="center" spacing={4}>
                                <Grid item xs={12}>
                                    <h5>Add Courses to Path</h5>
                                </Grid>
                                <Grid item xs={12} md={5}>
                                    <Autocomplete
                                        disablePortal
                                        fullWidth
                                        id="name-course"
                                        options={allCourses}
                                        getOptionLabel={option => option.name}
                                        renderInput={(params) => <TextField variant="standard"  {...params} label="Course's name" />}
                                        onChange={(e, newValue) => handleCourseSelection(newValue)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <Button onClick={() => handleAddCourse()} variant="outlined">Add Course</Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={`${classes.tableSection}`}>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <table className="table borderd">
                                    <thead>
                                        <tr>
                                            <th />
                                            <th>Course's name</th>
                                            <th>Level</th>
                                            <th>Status</th>
                                            {/* <th>Teacher</th> */}
                                            <th>Exp</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <Droppable droppableId="droppable-1">
                                        {(provider) => (
                                            <tbody
                                                className="text-capitalize"
                                                ref={provider.innerRef}
                                                {...provider.droppableProps}
                                            >
                                                {coursesInPath?.map((course, index) => (
                                                    <Draggable
                                                        key={course.name}
                                                        draggableId={course.name}
                                                        index={index}
                                                    >
                                                        {(provider) => (
                                                            <tr {...provider.draggableProps} ref={provider.innerRef}>
                                                                <td {...provider.dragHandleProps}> = </td>
                                                                <td>{course.name}</td>
                                                                <td>{course.level}</td>
                                                                <td>{course.status}</td>
                                                                {/* <td>{course.teacher}</td> */}
                                                                <td>{course.exp}</td>
                                                                <td style={{ cursor: 'pointer', color: 'red' }} onClick={() => { handleRemoveCourse(course.id, index) }}>{'remove'}</td>
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provider.placeholder}
                                            </tbody>
                                        )}
                                    </Droppable>
                                </table>
                            </DragDropContext>
                        </div>
                        <div style={{ margin: '30px 0px', display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={() => handleUpdatePath()} variant="outlined">Update Course Path</Button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UpdateCoursePath
