import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useHistory } from "react-router-dom";
import { getAllCourse } from 'src/services/courses.services';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmationDialog from 'src/reusable/confirmationDialog';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
    CBadge
} from '@coreui/react'
import { getAllCoursePath, deleteOneCourse } from 'src/services/courses.services';
import { toast } from 'react-toastify';


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

const DeleteIcon = (
    <DeleteOutlineIcon color="error" sx={{ cursor: 'pointer' }} />
);

const AllCoursesTable = () => {
    const classes = useStyles();
    let history = useHistory()
    const [loading, setLoading] = useState(false)

    const [allCourses, setAllCourses] = useState([])
    const [pageCourse, setPageCourse] = useState(1)

    const [allCoursesPath, setAllCoursesPath] = useState([])
    const [pageCoursePath, setPageCoursePath] = useState(1)

    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(undefined)

    const pageChangeCourse = newPage => {
        if (pageCourse !== newPage) {
            setPageCourse(newPage)
        }
    }

    const pageChangeCoursePath = newPage => {
        if (pageCoursePath !== newPage) {
            setPageCoursePath(newPage)
        }
    }

    const getAllCoursePathInSystem = async () => {
        const { status, data } = await getAllCoursePath()
        if (status === 200 && data.coursePath) {
            setAllCoursesPath(data.coursePath)
            setLoading(false)
        } else {
            toast.error('Something wrong happened')
        }
    }

    const getData = async () => {
        setLoading(true)
        const data = await getAllCourse()
        if (data && data.courseList) {
            setAllCourses(data.courseList)
        } else {
            toast.error('Something wrong happened')
        }
        setLoading(false)
    }

    useEffect(() => {
        getData()
        setPageCourse(1)
        getAllCoursePathInSystem()
        setPageCoursePath(1)
    }, [])

    const seeCourseInfo = (id) => {
        history.push(`/courseDetail/${id}`)
    }

    const seeTeacherInfo = (id) => {
        history.push(`/users/${id}/teacher`)
    }

    const seePathInfo = (id) => {
        history.push(`/viewCoursePath/${id}`)
    }

    const updateCourseInfo = (id) => {
        history.push(`/updateCourse/${id}`)
    }

    const updatePathInfo = (id) => {
        history.push(`/updateCoursePath/${id}`)
    }

    const prepareDeleteCourse = (course) => {
        setSelectedCourse(course)
        setOpenDialogDelete(true)
    }

    const handleDeleteCourse = async () => {
        setLoading(true)
        const { status, data } = await deleteOneCourse(selectedCourse.id)
        if (status === 200) {
            setLoading(false)
            getData()
            setPageCourse(1)
            toast.success('Delete course successfully')
        } else {
            setLoading(false)
            toast.error('Something wrong happened')
        }
        setSelectedCourse(undefined)
    }

    return (
        <>
            <div className={classes.root}>
                {loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null}
                <CRow>
                    <CCol xl={12}>
                        <CCard>
                            <CCardHeader>
                                <h5>All Courses</h5>
                                {/* <small className="text-muted"> example</small> */}
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    columnFilter
                                    tableFilter={{ 'placeholder': 'Type to search…' }}
                                    sorter
                                    items={allCourses}
                                    fields={[
                                        { key: 'id', _classes: 'font-weight-bold' },
                                        'name', 'level', 'type',
                                        {
                                            key: 'Teacher',
                                            sorter: false,
                                            filter: false
                                        },
                                        {
                                            key: 'Total Registration',
                                            sorter: false,
                                            filter: false
                                        },
                                        {
                                            key: 'Teacher Info',
                                            sorter: false,
                                            filter: false
                                        },
                                        {
                                            key: 'Course Info',
                                            sorter: false,
                                            filter: false
                                        },
                                        {
                                            key: 'Update Course',
                                            sorter: false,
                                            filter: false
                                        },
                                        {
                                            key: 'Delete Course',
                                            sorter: false,
                                            filter: false
                                        }
                                    ]}
                                    hover
                                    striped
                                    itemsPerPage={10}
                                    activePage={pageCourse}
                                    scopedSlots={{
                                        'Teacher Info':
                                            (item) => {
                                                return (
                                                    <td onClick={() => seeTeacherInfo(item.id_internal_member)} className="py-2">
                                                        {TeacherIcon}
                                                    </td>
                                                )
                                            },
                                        'Course Info':
                                            (item) => {
                                                return (
                                                    <td onClick={() => seeCourseInfo(item.id)} className="py-2">
                                                        {TeacherIcon}
                                                    </td>
                                                )
                                            },
                                        'Update Course':
                                            (item) => {
                                                return (
                                                    <td onClick={() => updateCourseInfo(item.id)} className="py-2">
                                                        {RightArrowIcon}
                                                    </td>
                                                )
                                            },
                                        'Teacher':
                                            (item) => {
                                                return (
                                                    <td className="py-2">
                                                        {item.firstName + ' ' + item.lastName}
                                                    </td>
                                                )
                                            },
                                        'Total Registration':
                                            (item) => {
                                                return (
                                                    <td className="py-2">
                                                        {item.numofreg}
                                                    </td>
                                                )
                                            },
                                        'Delete Course':
                                            (item) => {
                                                return (
                                                    <td onClick={() => prepareDeleteCourse(item)} className="py-2">
                                                        {DeleteIcon}
                                                    </td>
                                                )
                                            },
                                    }}
                                />
                                <CPagination
                                    activePage={pageCourse}
                                    onActivePageChange={pageChangeCourse}
                                    pages={Math.ceil(allCourses.length / 10)}
                                    doubleArrows={false}
                                    align="center"
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <hr className={classes.hr}></hr>
                <CRow>
                    <CCol xl={12}>
                        <CCard>
                            <CCardHeader>
                                <h5>All Course Paths</h5>
                                {/* <small className="text-muted"> example</small> */}
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    columnFilter
                                    tableFilter={{ 'placeholder': 'Type to search…' }}
                                    sorter
                                    items={allCoursesPath}
                                    fields={[
                                        { key: 'id', _classes: 'font-weight-bold' },
                                        'name',
                                        {
                                            key: 'desc',
                                            label: 'Description',
                                            sorter: false,
                                        },
                                        {
                                            key: 'Path Info',
                                            sorter: false,
                                            filter: false
                                        },
                                        {
                                            key: 'Update Path',
                                            sorter: false,
                                            filter: false
                                        },
                                        {
                                            key: 'Delete Path',
                                            sorter: false,
                                            filter: false
                                        }
                                    ]}
                                    hover
                                    striped
                                    itemsPerPage={10}
                                    activePage={pageCourse}
                                    scopedSlots={{
                                        'Path Info':
                                            (item) => {
                                                return (
                                                    <td onClick={() => seePathInfo(item.id)} className="py-2">
                                                        {TeacherIcon}
                                                    </td>
                                                )
                                            },
                                        'Update Path':
                                            (item) => {
                                                return (
                                                    <td onClick={() => updatePathInfo(item.id)} className="py-2">
                                                        {RightArrowIcon}
                                                    </td>
                                                )
                                            },
                                        'Delete Path':
                                            (item) => {
                                                return (
                                                    <td className="py-2">
                                                        {DeleteIcon}
                                                    </td>
                                                )
                                            },
                                    }}
                                />
                                <CPagination
                                    activePage={pageCoursePath}
                                    onActivePageChange={pageChangeCoursePath}
                                    pages={Math.ceil(allCoursesPath.length / 10)}
                                    doubleArrows={false}
                                    align="center"
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
            <ConfirmationDialog open={openDialogDelete} setOpen={setOpenDialogDelete} title="Are you sure to delete this course ?" onAgreeFn={handleDeleteCourse} />
        </>
    )
}

export default AllCoursesTable
