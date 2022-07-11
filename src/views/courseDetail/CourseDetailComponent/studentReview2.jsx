import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'reactstrap';
// import { makeStyles } from "@material-ui/core/styles";
import './studentReview2.css'
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { getCourseReviews } from "src/services/courses.services";

// // Import Swiper styles
// // import 'swiper/css';
// import 'swiper/swiper-bundle.min.css'
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/scrollbar/scrollbar.min.css";

import { useParams } from "react-router-dom";
import ViewFeedback from "src/views/feedback/viewFeedback";
// const useStyles = makeStyles((theme) => ({

//     containerStyle: {
//         paddingBottom: "50px",
//         paddingTop: "50px",
//         fontFamily: '"Raleway", sans-serif',
//         textAlign: "center !important",

//         // backgroundColor: "yellow"      
//     },
// }))
// {'1': 0, '2': 0, '3': 0, '4': 0, '5': 0}
const StudentReview2 = (props) => {
    const courseId = useParams()
    // SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
    const [countReview, setCountReview] = useState({})
    const [creviews, setCReviews] = useState([])
    const [stop, setStop] = useState(false)
    useEffect(() => {
        if (!stop) {
            const getReview = async () => {
                const reviews = await getCourseReviews(courseId.id)
                setCReviews(reviews)
                const counts = reviews.map(r => r.rating).reduce((acc, value) => ({
                    ...acc,
                    [value]: (acc[value] || 0) + 1
                }), {});
                setCountReview(counts)
            }
            getReview()
        }
        return () => {
            setStop(true)
        }
    }, [])

    const countPercent = (item, obj) => {
        if (item) return (100 * (item / (Object.values(obj).reduce((a, b) => a + b, 0)))).toFixed(2)
        else return 0
    }
    return (
        <>
            <Container className="studentReviewContainer">
                <Row>
                    <h2 className="studentReviewText" style={{
                        fontWeight: "500",
                        fontFamily: "Raleway"
                    }}>Student's Review</h2>
                </Row>
                <Row>
                    <Col xs="12" sm='12'>
                        <div className="reviews-container">
                            <div className="review">
                                <span className="icon-container">1 <i className="fas fa-star"></i></span>
                                <div className="progress">
                                    <div className="progress-done" style={{ width: 5 * countPercent(countReview['1'], countReview) }} data-done="0"></div>
                                </div>
                                <span className="percent">{countPercent(countReview['1'], countReview) + '%'}</span>
                                <span style={{ marginLeft: '10px' }} className="percent">{(countReview['1'] ? countReview['1'] : 0) + ' vote(s)'}</span>
                            </div>
                            <div className="review">
                                <span className="icon-container">2 <i className="fas fa-star"></i></span>
                                <div className="progress">
                                    <div className="progress-done" style={{ width: 5 * countPercent(countReview['2'], countReview) }} data-done="0"></div>
                                </div>
                                <span className="percent">{countPercent(countReview['2'], countReview) + '%'}</span>
                                <span style={{ marginLeft: '10px' }} className="percent">{(countReview['2'] ? countReview['2'] : 0) + ' vote(s)'}</span>
                            </div>
                            <div className="review">
                                <span className="icon-container">3 <i className="fas fa-star"></i></span>
                                <div className="progress">
                                    <div className="progress-done" style={{ width: 5 * countPercent(countReview['3'], countReview) }} data-done="0"></div>
                                </div>
                                <span className="percent">{countPercent(countReview['3'], countReview) + '%'}</span>
                                <span style={{ marginLeft: '10px' }} className="percent">{(countReview['3'] ? countReview['3'] : 0) + ' vote(s)'}</span>

                            </div>
                            <div className="review">
                                <span className="icon-container">4 <i className="fas fa-star"></i></span>
                                <div className="progress">
                                    <div className="progress-done" style={{ width: 5 * countPercent(countReview['4'], countReview) }} data-done="0"></div>
                                </div>
                                <span className="percent">{countPercent(countReview['4'], countReview) + '%'}</span>
                                <span style={{ marginLeft: '10px' }} className="percent">{(countReview['4'] ? countReview['4'] : 0) + ' vote(s)'}</span>

                            </div>
                            <div className="review">
                                <span className="icon-container">5 <i className="fas fa-star"></i></span>
                                <div className="progress">
                                    <div className="progress-done" style={{ width: 5 * countPercent(countReview['5'], countReview) }} data-done="0"></div>
                                </div>
                                <span className="percent">{countPercent(countReview['5'], countReview) + '%'}</span>
                                <span style={{ marginLeft: '10px' }} className="percent">{(countReview['5'] ? countReview['5'] : 0) + ' vote(s)'}</span>

                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <ViewFeedback type='course' id={courseId.id} />
                </Row>
            </Container>
        </>
    );
}




export default StudentReview2;
