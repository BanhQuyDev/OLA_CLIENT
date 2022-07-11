import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import {
    Row, Col
} from 'reactstrap';
import OneCourseCard from "./oneCourseCard";
import SearchCourseArea from "./searchCourseArea";
import { getAllCourse } from "../../../services/courses.services"
import LinearProgress from '@mui/material/LinearProgress';

const AllCourseSession = (props) => {
    // const courseFilter = useParams()
    const [dataFeature, setDataFeature] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getCourseData = async () => {
            setLoading(true)
            const allCourses = await getAllCourse()
            setDataFeature(allCourses.courseList)
            setLoading(false)
        }
        getCourseData()
    }, [])

    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
            }
            <div id="courses" style={{ background: "#f6f6f6", marginBottom: '30px' }} >
                <div className="container" style={{ minHeight: "700px" }}>
                    <Row>
                        <Col xs="12" md="6" className="section-title">
                            <h2
                                style={{
                                    marginTop: '50px',
                                    fontWeight: "700",
                                    fontFamily: "Raleway",
                                    background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}
                            >
                                Current Courses
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <SearchCourseArea setDataFeature={setDataFeature} />
                    </Row>

                    <Row>
                        {dataFeature.map((d, i) => (
                            <Col key={`${d.name}-${i}`} xs="12" sm="12" md="6" lg='4' xl='3'>
                                <OneCourseCard courseData={d} path={props.path} />
                            </Col>

                        ))
                        }
                    </Row>
                </div>
            </div>
        </>

    );
}

export default AllCourseSession;
