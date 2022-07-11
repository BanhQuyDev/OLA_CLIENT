import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import './teacherCard.scss'
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
    },
}))

const TeacherCard = (props) => {
    const classes = useStyles();
    const history = useHistory()

    const getFeedback = (t_id) => {
        if (t_id) {
            const teacher = props.feedbackTeachers.find(f => f.id === t_id)
            if (teacher) {
                return 'Rating: ' + (parseFloat(teacher.rating).toFixed(2)) + ' / 5.00'
            } else {
                return 'No rating yet'
            }
        }
    }

    return (
        <>
            {
                props.teacherInfo && (
                    <div className={classes.root}>
                        <div className="profile-card js-profile-card">
                            <div className="profile-card__img">
                                <img
                                    src= {props.teacherInfo.image ? props.teacherInfo.image : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"}
                                    alt="profile card" />
                            </div>

                            <div className="profile-card__cnt js-profile-cnt">
                                <div className="profile-card__name">{props.teacherInfo.firstName + ' ' + props.teacherInfo.lastName}</div>
                                <div className="profile-card__txt">{getFeedback(props.teacherInfo.id)}</div>
                                <div className="profile-card__txt">{'Major: ' + props.teacherInfo.major}</div>
                                <div className="profile-card__txt">{'Nationality: ' + props.teacherInfo.nationality}</div>
                            </div>

                            <div className="profile-card__cnt js-profile-cnt">
                                <Button className="profile-card__button" onClick={() => { history.push(`/feedback/teacher/${props.teacherInfo.id}`) }} variant="outlined">FEEDBACK</Button>
                                <Button
                                    className="profile-card__button"
                                    onClick={() => { history.push(`/bookClass/${props.teacherInfo.id}`) }}
                                    variant="outlined"
                                >
                                    BOOK CLASS
                                </Button>
                                <Button
                                    className="profile-card__button"
                                    onClick={() => { history.push(`/users/${props.teacherInfo.id}/teacher`) }}
                                    variant="outlined">VIEW DETAIl</Button>
                            </div>

                        </div>
                    </div>
                )
            }
        </>
    )
}

export default TeacherCard
