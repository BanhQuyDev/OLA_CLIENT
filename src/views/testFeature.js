import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
}))


let TestFeature = (props) => {
    const classes = useStyles()

    useEffect(() => {
    }, []);

    return (
        <>
            <div className={`${classes.root}`}>
            </div>
        </>
    )
}


export default TestFeature