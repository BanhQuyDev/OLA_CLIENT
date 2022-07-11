import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        // position: 'fixed',
        // bottom: 0,
        width: "100%",
        marginTop: 50,
        height: 20,
        padding: 20,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: '-webkit - linear - gradient(to right, #5ca9fb 0%, #6372ff 100%)', 
        background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)', 
        // backgroundColor: "red",
        
    },
    contactInfo:{
        display: "none",
    },
    copyRight: {
        color: 'white',
    }
}))

let Footer = (props) => {
    const classes = useStyles()
    return (
            <footer className={`${classes.root} footer`}>
                    <span className={classes.copyRight}>2021 Copyright: OLA EDUCATION </span>
                    <div className={`${classes.contactInfo} text-muted`}>Contact info: </div>
            </footer>
    )
}

export default Footer


