import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: "flex",
        maxHeight: "100px",
        maxWidth: "400px",
        margin: "0 0 20px 0",
        boxShadow: "0 2px 10px 0px #ede7e6",
        // borderRadius: "10px",
        cursor: "pointer",
        // alignItems: "center"
    },
    pictureFrame: {
        width: "25%",
        backgroundColor: "gray",
        // borderRadius: "10px",
    },
    infoFrame: {
        width: "75%",
        flexGrow: 1,
        padding: "0 2% 0 2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        // alignItems: "space-between",


        // backgroundColor: "red",
    },

    title: {
        // width: "100%",
        // whiteSpace: "normal",
        // wordWrap: "break-all",
        margin: '5% 2% 0 2%',
        // fontFamily: "Open Sans",
        letterSpacing: "1px",
        fontSize: "13px",
        // fontWeight: 700,
        // color: "gray",
        // fontFamily: "Playfair Display",
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

let HorizontalNews = (props) => {
    const classes = useStyles()

    useEffect(()=>{
        console.log(props.data)
    })

    return (
        <div className={`${classes.root}`}>
            <img
                className={`${classes.pictureFrame}`}
                src={props.data.image}
                alt="Nah"
            />
            <div className={`${classes.infoFrame}`}>
                <p className={`${classes.title}`}>
                    {props.data.fullTitle}
                </p>
                <a className={`${classes.stamp}`}>REGISTER</a>
            </div>

        </div>

    )
}


export default HorizontalNews