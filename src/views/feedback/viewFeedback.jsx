import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getAllFeedbackTeacher } from 'src/services/user.services';
import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import { getCourseReviews } from 'src/services/courses.services';

const mockData = [
    {
        rating: 1,
        id: 1,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. "
    },
    {
        id: 2,
        rating: 4,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. "
    },
    {
        id: 3,
        rating: 5,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. "
    },
    {
        id: 4,
        rating: 2,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. "
    },
    {
        id: 5,
        rating: 3,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. "
    },
    {
        id: 6,
        rating: 4,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt sapien tellus, sed maximus nunc venenatis at. "
    }
]
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        marginBottom: '30px',
        padding: '0 50px'
    },
    reviewRoot: {
        margin: '10px 0',
        display: 'flex',
        alignItems: 'center'
    },
    reviewContent: {
        marginLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    feedback: {
        margin: 0
    },
}))


let ViewFeedback = (props) => {
    const classes = useStyles()
    const [reviewCount, setReviewCount] = useState(1)
    // const [numOfPage, setNumOfPage] = useState(1)
    const [dataToShow, setDataToShow] = useState([])
    const [stop, setStop] = useState(false)

    useEffect(() => {
        if (!stop) {
            const getFeedback = async () => {
                if (props.type === 'teacher') {
                    const data = await getAllFeedbackTeacher(props.id)
                    setDataToShow(data)
                } else {
                    const reviews = await getCourseReviews(props.id)
                    setDataToShow(reviews)
                }
            }
            getFeedback()
        }
        return () => {
            setStop(true)
        }
    }, []);

    const handlePageChange = (value) => {
        setReviewCount(value)
    }
    return (
        <>
            <div className={`${classes.root}`}>
                {
                    dataToShow.slice((reviewCount - 1) * 5, (reviewCount) * 5).map(review => (
                        <div key={review.id} className={`${classes.reviewRoot}`}>
                            {/* <Avatar>A</Avatar> */}
                            <div className={`${classes.reviewContent}`}>
                                <Rating name="student-rating-read" value={review.rating} readOnly />
                                <p className={`${classes.feedback}`}>{review.content}</p>
                            </div>
                        </div>
                    ))
                }
                <div style={{ marginTop: '10px' }}>
                    <Pagination count={Math.ceil(dataToShow.length / 5)} page={reviewCount} onChange={(event, value) => handlePageChange(value)} />
                </div>
            </div>
        </>
    )
}


export default ViewFeedback