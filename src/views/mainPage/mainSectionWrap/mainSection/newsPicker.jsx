import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useHistory } from 'react-router-dom';
import VeritcalNews from './veritcalNews'
// import HorizontalNews from './horizontalNews'
import { getTop3CoursesWithType } from 'src/services/courses.services';

import styles from './newsPicker.module.css'

function TabPanel(props) {
    let history = useHistory()
    // const { children, value, index, ...other } = props;
    const classes = useStyles()

    if (!props.data) {
        return (
            <div
                role="tabpanel"
                hidden={props.value !== props.picker}
                id={`scrollable-auto-tabpanel-${props.picker}`}
                aria-labelledby={`scrollable-auto-tab-${props.picker}`}
            // {...props.other}
            >
                {props.value === props.picker && (
                    <div className={`${styles.contentPanel}`}>
                        <PropagateLoader color={"#000000"} loading={true} css={""} size={5} />
                    </div>
                )}
            </div>
        );

    }
    else {
        // const posts = []
        // Object.entries(props.data).forEach(x => { posts.push(x) })
        return (
            <div
                role="tabpanel"
                hidden={props.value !== props.picker}
                id={`scrollable-auto-tabpanel-${props.picker}`}
                aria-labelledby={`scrollable-auto-tab-${props.picker}`}
            // {...props.other}
            >
                {props.value === props.picker && (
                    <div className={classes.tabPanelsContainer}>
                        <p onClick={() => history.push('/allCourse')} href="#" className={`${styles.buttonReadAll}`}>More Courses</p>
                        <div className={`${styles.contentPanel}`}>
                            <div className={`${styles.VContentPanel}`}>
                                {props.data.map((item, i) =>
                                (
                                    <VeritcalNews key={i} data={item} />
                                )
                                )}
                            </div>
                        </div>
                    </div>

                )}
            </div>
        );
    }
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '0 3% 0 0',
        // display: "flex",
        width: '15%',
        "& .MuiAppBar-colorDefault": {
            backgroundColor: "white"
        },
    },

    paper: {
        // fontSize: '10px',
        flexGrow: 1,
    },

    tabs: {
        "& .MuiTab-root": {
            "& .MuiTab-wrapper": {
                background: 'linear-gradient(to right, #141e30, #243b55)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: '12px',
            },
            outline: 'none'
        }
    },

    appBar: {
        boxShadow: "0 5px 6px -6px gray",
        marginBottom: "30px",
    },

    indicator: {
        backgroundColor: "black",
        fontStyle: "italic",
    },

    tabPanelsContainer: {
        position: "relative",
    }
}))

const tagLines = ["Ielts", 'Toeic', "Speaking", "Writing", 'Reading', 'Listening']
let NewsPicker = (props) => {
    const classes = useStyles()
    const [value, setValue] = useState("Ielts");
    const [top3, setTop3] = useState(undefined)

    const handleChange = async (event, newValue) => {
        //get news data for different category here
        setValue(newValue);
        const data = await getTop3CoursesWithType(newValue.toLowerCase())
        console.log(data)
        setTop3(data)
    };

    useEffect(() => {
        const callData = async () => {
            const data = await getTop3CoursesWithType(value.toLowerCase())
            setTop3(data)
        }
        callData()
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" className={classes.appBar}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    // indicatorColor="primary"
                    className={classes.tabs}
                    classes={{
                        indicator: classes.indicator
                    }}
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {tagLines.map((x, i) => (
                        <Tab value={x} key={i} label={x} {...a11yProps(i)} />
                    ))}
                </Tabs>
            </AppBar>
            {tagLines.map((x, i) => (
                <TabPanel key={i} value={value} picker={x} index={i} data={top3} />
            ))}

        </div>

    )
}


export default NewsPicker