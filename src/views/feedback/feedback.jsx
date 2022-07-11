import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import "./feedback.scss"
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { sendFeedback } from 'src/services/common.services';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuthContext } from 'src/context/AuthContext';
import { getAllFeedbackTeacher } from 'src/services/user.services';
import { getCourseReviews } from 'src/services/courses.services';
import { deleteFeedback, updateFeedback } from 'src/services/common.services';


const useStyles = makeStyles((theme) => ({
    sendFeedback: {
        "&:focus": {
            outline: 'none',
            boxShadow: 'none'
        }
    },
}))

const allEmo = ['angry', 'sad', 'ok', 'good', 'happy']

const Feedback = () => {
    const classes = useStyles();
    const auth = useAuthContext()
    const history = useHistory()
    const currentUser = JSON.parse(auth.user)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [isActive, setIsActive] = useState('happy')
    const [feedbackContent, setFeedbackContent] = useState('')
    const [allFeedback, setAllFeedback] = useState([])
    const [savedUserFeedback, setSavedUserFeedback] = useState(undefined)

    useEffect(() => {
        // window.location.reload();
        getFeedback()
    }, [])

    const getFeedback = async () => {
        setLoading(true)
        let data = []
        if (params.type === 'teacher') {
            data = await getAllFeedbackTeacher(params.id)
        } else {
            data = await getCourseReviews(params.id)
        }
        setAllFeedback(data)
        if (data.length > 0) {
            const userFeedback = data.find(feedback => feedback.id_student === currentUser.id)
            if (userFeedback) {
                console.log(userFeedback)
                setSavedUserFeedback(userFeedback)
                changeEmo(allEmo[userFeedback.rating - 1])
                setFeedbackContent(userFeedback.content)
            }
        }
        setLoading(false)
    }

    const changeEmo = (emo) => {
        setIsActive(emo)
    }

    const onFeedbackContentChange = event => {
        setFeedbackContent(event.target.value)
    }

    const handleSendFeedback = async () => {
        if (feedbackContent !== '') {
            setLoading(true)
            const status = await sendFeedback(currentUser.id, params.id, params.type, feedbackContent, mappingRating())
            setLoading(false)
            if (status === 201) {
                toast.success('Sent feedback')
                window.location.reload();
            } else {
                toast.error('Something went wrong')
            }
        } else {
            toast.warn('You need to write feedback')
        }
    }

    const handleDeleteFeedback = async () => {
        setLoading(true)
        const result = await deleteFeedback(savedUserFeedback.id)
        setLoading(false)
        if (result.status === 200) {
            toast.success('Delete feedback successfully')
            window.location.reload();
        } else {
            toast.error('Something went wrong')
        }
    }

    const handleUpdateFeedback = async () => {
        if (feedbackContent !== '') {
            setLoading(true)
            const result = await updateFeedback(savedUserFeedback.id, feedbackContent, mappingRating())
            setLoading(false)
            if (result.status === 200) {
                toast.success('Update feedback successfully')
                window.location.reload();
            } else {
                toast.error('Something went wrong')
            }
        } else {
            toast.warn('You need to write feedback')
        }
    }

    const mappingRating = () => {
        return allEmo.indexOf(isActive) + 1
    }
    return (
        <>
            {
                loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
            }
            <div className="rootFeedback">
                {
                    currentUser.role === 'student' ? (
                        <>
                            <h4>Give your feedback</h4>
                            <br></br>
                            <ul className="feedback">
                                <li className={'angry' + (isActive === 'angry' ? ' active' : '')} onClick={() => changeEmo('angry')}>
                                    <div>
                                        <svg className="eye left">
                                            <use xlinkHref="#eye" />
                                        </svg>
                                        <svg className="eye right">
                                            <use xlinkHref="#eye" />
                                        </svg>
                                        <svg className="mouth">
                                            <use xlinkHref="#mouth" />
                                        </svg>
                                    </div>
                                </li>
                                <li className={'sad' + (isActive === 'sad' ? ' active' : '')} onClick={() => changeEmo('sad')}>
                                    <div>
                                        <svg className="eye left">
                                            <use xlinkHref="#eye" />
                                        </svg>
                                        <svg className="eye right">
                                            <use xlinkHref="#eye" />
                                        </svg>
                                        <svg className="mouth">
                                            <use xlinkHref="#mouth" />
                                        </svg>
                                    </div>
                                </li>
                                <li className={'ok' + (isActive === 'ok' ? ' active' : '')} onClick={() => changeEmo('ok')}>
                                    <div></div>
                                </li>
                                <li className={'good' + (isActive === 'good' ? ' active' : '')} onClick={() => changeEmo('good')}>
                                    <div>
                                        <svg className="eye left">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg className="eye right">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg className="mouth">
                                            <use xlinkHref="#mouth"></use>
                                        </svg>
                                    </div>
                                </li>
                                <li className={'happy' + (isActive === 'happy' ? ' active' : '')} onClick={() => changeEmo('happy')}>
                                    <div>
                                        <svg className="eye left">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                        <svg className="eye right">
                                            <use xlinkHref="#eye"></use>
                                        </svg>
                                    </div>
                                </li>
                            </ul>
                            <br></br>
                            <TextField
                                id="feedback"
                                placeholder="Enter Your feedback"
                                multiline
                                rows={4}
                                value={feedbackContent}
                                onChange={e => onFeedbackContentChange(e)}
                                fullWidth
                                variant="filled"
                            />
                            <br></br>
                            {savedUserFeedback && savedUserFeedback.id ? (
                                <>
                                    <div style={{ display: 'flex' }}>
                                        <Button
                                            sx={{ marginRight: '10px' }}
                                            className={classes.sendFeedback}
                                            onClick={() => handleUpdateFeedback()}
                                            variant="outlined"
                                        >
                                            UPDATE FEEDBACK
                                        </Button>
                                        <Button
                                            sx={{ marginLeft: '10px' }}
                                            className={classes.sendFeedback}
                                            onClick={() => handleDeleteFeedback()}
                                            variant="outlined"
                                        >
                                            DELETE FEEDBACK
                                        </Button>
                                    </div>

                                </>
                            ) : (
                                <Button
                                    className={classes.sendFeedback}
                                    onClick={() => handleSendFeedback()}
                                    variant="outlined"
                                >
                                    SEND FEEDBACK
                                </Button>
                            )
                            }


                            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 4" id="eye">
                                    <path d="M1,1 C1.83333333,2.16666667 2.66666667,2.75 3.5,2.75 C4.33333333,2.75 5.16666667,2.16666667 6,1"></path>
                                </symbol>
                                <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 7" id="mouth">
                                    <path d="M1,5.5 C3.66666667,2.5 6.33333333,1 9,1 C11.6666667,1 14.3333333,2.5 17,5.5"></path>
                                </symbol>
                            </svg>
                        </>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ marginTop: '20px' }}>Happy Learning / Teaching !</p>
                            <Button
                                onClick={() => { history.push('/mainPage') }}
                                variant="outlined"
                            >Go To Main Page
                            </Button>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Feedback
