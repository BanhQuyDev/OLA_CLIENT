import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
// import { GitHubIcon , LinkedInIcon } from '@material-ui/icons';


// import { top_dailyNews, top_weekNews, top_monthNews } from '../../../../apiData/sampleData'

const useStyles = makeStyles((theme) => ({
    root: {
        // position: "sticky",
        maxWidth: "25%",
        // flexGrow: 1,
        // height: 1000,
        // backgroundColor: "gray",
        borderLeft: "1px solid #9c9c9c",
        wordWrap: "break-word",
        padding: "10px 20px 20px 40px",
        marginLeft: 20,

    },

    cardHolder: {
        paddingTop: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },

    topNewsHolder: {
        width: "100%",
        height: 400,
        // backgroundColor: 'red',
        display: "flex",
        flexFlow: 'column',
    },

    infoFrame: {
        // width: "75%",
        flexGrow: 1,
        padding: "0 2% 0 2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        minWidth: 0,
        cursor: "pointer",
        // alignItems: "space-between",
    },

    title: {
        margin: '5% 2% 0 2%',
        letterSpacing: "1px",
        fontSize: "13px",
        fontFamily: "Playfair Display",
        fontWeight: 400,
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        flexWrap: "wrap",


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

    aboutSection: {
        borderBottom: "1px solid #9c9c9c",
        paddingBottom: 20,
        marginBottom: 20,
        fontSize: 15,
    },

    headText: {
        fontWeight: 600,
        textTransform: "uppercase",
    },

    about: {
    },

    contactSection: {
        borderBottom: "1px solid #9c9c9c",
        paddingBottom: 20,
        marginBottom: 20,
    },

    contactPoint: {
        width: "100%",
        height: 80,
        display: "flex",
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    icon: {
        fontSize: 30,
        cursor: "pointer",
        padding: 16,
        boxSizing: "content-box",
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: 4,
        "&:hover": {
            backgroundColor: "#f0f1f2",
        }
    },




}))

function Intro(props) {
    const classes = useStyles()
    return (
        <>
        <div className={`${classes.root}`}>
            <div className={classes.aboutSection}>
                <p className={classes.headText}>About OLA EDUCATION</p>
                <p className={classes.about}> Maecenas volutpat condimentum porttitor. Integer ligula dui, feugiat nec eros vel, tempor euismod eros. Proin a diam elementum, fermentum tortor quis, commodo nunc. Vestibulum volutpat lorem metus, accumsan pharetra risus auctor nec. Morbi quam lectus, pulvinar vel e</p>
            </div>

            <div className={classes.contactSection}>
                <p className={classes.headText} >Contact Point</p>
                <div className={classes.contactPoint}>
                    <FacebookIcon className={classes.icon} />
                    <GitHubIcon className={classes.icon} />
                    <LinkedInIcon className={classes.icon} />
                </div>
            </div>
        </div>
        </>

    )
}
export default Intro