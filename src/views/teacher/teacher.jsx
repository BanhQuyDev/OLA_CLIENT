import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import TeacherClasses from './teacherComponents/teacherClasses'


const useStyles = makeStyles((theme) => ({
    root: {
    },
}))

const TeacherManageMent = () => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <TeacherClasses />
            </div>
        </>
    )
}

export default TeacherManageMent
