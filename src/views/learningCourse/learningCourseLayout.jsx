import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player'
import UnitButton from './learningCourseComponents/unitButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getCourseDetail } from 'src/services/courses.services';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Document, Page, pdfjs } from "react-pdf";
import VideoPlayerSection from './learningCourseComponents/videoPlayerSection';
import { getStudentFinishedUnit, studentFinishUnit } from '../../services/user.services'
import { useAuthContext } from 'src/context/AuthContext';
import { cloneDeep } from 'lodash';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const useStyles = makeStyles((theme) => ({
    root: {
    },
    rootVideo: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '100px',
    },
    videoPlayer: {
        flexGrow: 3,
        height: '100%',
        position: 'relative',
        maxWidth: '1700px',
    },
    videoList: {
        flexGrow: 1,
        paddingLeft: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
    },

    //un-use
    playerWrapper: {
        position: 'relative',
        paddingTop: "56.25%"/* Player ratio: 100 / (1280 / 720) */,
    },

    //un-use
    reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },

    //un-use
    playerOverlay: {
        position: 'absolute',
        width: '100%',
        height: '60px',
        left: 0,
        bottom: 0,
        zIndex: 1,
    },

    extraInfoSection: {
        height: '1200px',
    },

    tabPanel: {
        paddingTop: '20px',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
        // backgroundColor: "#5ca9fb",
        // backgroundImage: "linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)",
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

    pdfTab: {
        paddingTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: "1000px",
        overflow: 'scroll',
        width: '100%',
        "& .react-pdf__Document": {
            height: "100%",
            "& .react-pdf__Page": {
                "& .react-pdf__Page__canvas": {
                    borderLeft: '1px solid grey',
                    borderRight: '1px solid grey',
                    width: '100% !important',
                    height: '100% !important',
                },
            },
        }
    },
    openPdfButton: {
        "&:focus": {
            outline: 'none',
            boxShadow: 'none'
        }
    },
    playerWrapper: {
        position: 'relative',
        paddingTop: '56.25%', /* Player ratio: 100 / (1280 / 720) */
    },
    reactPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
    }
}))

let LearningCourseLayout = (props) => {
    const auth = useAuthContext()
    const currentUser = JSON.parse(auth.user)
    const classes = useStyles()
    const courseId = useParams()
    const [value, setValue] = useState(0);
    const [units, setUnits] = useState([])
    const [currentUrl, setCurrentUrl] = useState('')
    const [courseImage, setCourseImage] = useState('')
    const [currentUnit, setCurrentUnit] = useState(undefined)
    const [unitDoneList, setUnitDoneList] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUnitDone = async (unitId) => {
        const isLasted = unitId === units[units.length - 1].id
        if (!unitDoneList.map(u => u.unitDone).includes(unitId)) {
            const { status, data } = await studentFinishUnit(unitId, courseId.courseId, currentUser.id, isLasted)
            if (status === 201 && data.id) {
                const newFinish = await getStudentFinishedUnit(courseId.courseId, currentUser.id)
                console.log(newFinish)
                if (newFinish.status === 200) {
                    setUnitDoneList(newFinish.data)
                }
            }
        }
    }

    useEffect(() => {
        const getCourse = async () => {
            const courseDataInfo = await getCourseDetail(courseId.courseId)
            console.log(courseDataInfo)
            const savedUnits = cloneDeep(courseDataInfo.units).sort((a, b) => parseInt(a.order) - parseInt(b.order))
            setUnits(savedUnits)
            console.log(courseDataInfo.units)
            setCurrentUnit(courseDataInfo.units.find(unit => Number(unit.order) === 1))
            setCurrentUrl(courseDataInfo.units.find(unit => Number(unit.order) === 1).video_url)
            setCourseImage(courseDataInfo.image)

            const { status, data } = await getStudentFinishedUnit(courseId.courseId, currentUser.id)
            console.log(data)
            if (status === 200) {
                setUnitDoneList(data)
            }
        }
        getCourse()
    }, []);

    const changeUnit = (i) => {
        setCurrentUrl(units[i].video_url)
        setCurrentUnit(units[i])
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <>
            <div className={`${classes.root}`}>
                <div className={`${classes.rootVideo}`}>
                    <div className={`${classes.videoPlayer}`}>
                        <div className={`${classes.playerWrapper}`}>
                            <VideoPlayerSection url={currentUrl} currentUnit={currentUnit} handleUnitDone={handleUnitDone} />
                        </div>
                    </div>
                    <div className={`${classes.videoList}`}>
                        {units.map((unit, i) =>
                            <UnitButton finish={unitDoneList.map(u => u.unitDone).includes(unit.id)} unitData={unit} unitIndex={i} clickFunc={changeUnit} onClick={() => changeUnit(i)} key={i} >{unit.name}</UnitButton>
                        )
                        }
                    </div>
                </div>
                <hr></hr>
                <div className={`${classes.extraInfoSection}`}>
                    <Tabs className={`${classes.tabs}`} value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
                        {/* <Tab label="Instructor Information" {...a11yProps(0)} /> */}
                        <Tab label="Learning Material" {...a11yProps(0)} />
                        <Tab label="Unit Information" {...a11yProps(1)} />
                    </Tabs>
                    {/* <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel> */}
                    <TabPanel value={value} index={0}>
                        {currentUnit ?
                            (
                                <div className={`${classes.pdfTab}`}>
                                    <Button className={`${classes.openPdfButton}`} variant="outlined" onClick={() => window.open(currentUnit.file_url, "_blank")}>
                                        OPEN IN BROWSER
                                    </Button>
                                    <hr />
                                    <Document
                                        file={{
                                            url: currentUnit.file_url,
                                        }}
                                        onLoadSuccess={onDocumentLoadSuccess}>
                                        {Array.from(new Array(numPages), (el, index) => (
                                            <Page width={1200} key={`page_${index + 1}`} pageNumber={index + 1} />
                                        ))}
                                    </Document>
                                </div>
                            ) : null
                        }
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Typography>
                            psum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. Etiam aliquam tincidunt sem, ut condimentum dui. Praesent at sem a nisi sagittis cursus. Maecenas auctor ultrices dui sed convallis. Nunc nec est ut odio vestibulum varius non et ex. Maecenas nibh turpis, molestie eu pharetra non, tincidunt eget diam. Fusce vehicula nisl in lacus malesuada, id tincidunt justo condimentum. Mauris maximus vulputate enim, quis dapibus est gravida et.
                        </Typography>
                    </TabPanel>
                </div>
            </div>
            <div>
            </div>

        </>
    )
}

function TabPanel(props) {
    const classes = useStyles()
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <div className={`${classes.tabPanel}`}>
                        {children}
                    </div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default LearningCourseLayout