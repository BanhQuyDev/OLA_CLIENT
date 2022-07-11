import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Intro from './mainSection/topNews'
import NewsPicker from './mainSection/newsPicker'
import AboutSession from './aboutSession'
import Testimonials from './testimonials'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: "flex-start",
        padding: '0 8% 0 7%',
        height: '600px'
    },

    commonStyle: {
        height: '500px'
    },
}))

let MainSection = (props) => {
    const classes = useStyles()

    return (
        <>
            <div className={`${classes.root}`}>
                <NewsPicker />
                <Intro />
            </div>
            <div className={`${classes.commonStyle}`}>
                <AboutSession />
            </div>
            <div className={`${classes.commonStyle}`}>
                <Testimonials />
            </div>

        </>
    )
}


export default MainSection