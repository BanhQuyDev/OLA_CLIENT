import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import StudentCourse from './studentsComponents/studentCourses';
import StudentClasses from './studentsComponents/studentClasses';


const useStyles = makeStyles((theme) => ({
    root: {
    },
}))

const StudentManageMent = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <StudentCourse />
                <StudentClasses />
            </div>
        </>
    )
}

export default StudentManageMent
