import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
        maxHeight: "100px",
        maxWidth: "400px",
        margin: "0 0 20px 0",
        boxShadow: "0 2px 10px 0px #ede7e6",
        cursor: "pointer",
        background: 'white',
    },
    pictureFrame: {
        width: "25%",
        backgroundColor: "gray",
    },
    infoFrame: {
        width: "75%",
        flexGrow: 1,
        padding: "0 2% 0 2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },

    title: {
        margin: '5% 2% 0 2%',
        letterSpacing: "1px",
        fontSize: "13px",
        fontWeight: 400,


    },

    stamp: {
        margin: '0 2% 5% 2%',
        fontFamily: "Open Sans",
        letterSpacing: "1px",
        fontSize: "10px",
        fontWeight: 700,
        background: 'linear-gradient(to right, #141e30, #243b55)',
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
}))

let UnitButton = (props) => {
    const classes = useStyles()

    return (
        <div style={{borderBottom: props.finish ? '2px solid red' : 'none'}} className={`${classes.root}`} onClick={()=>props.clickFunc(props.unitIndex)}>
            {/* <img
                className={`${classes.pictureFrame}`}
                src={props.data.image}
                alt="Nah"
            /> */}
            <div className={`${classes.infoFrame}`}>
                <p className={`${classes.title}`}>
                    {props.unitData.name}
                </p>
                <p className={`${classes.stamp}`}>Estimated length: {props.unitData.estimatedTime}</p>
            </div>

        </div>

    )
}


export default UnitButton