import React, { useState } from "react";
import { Container, Row } from 'reactstrap';
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import './courseTeacher.scss'

const useStyles = makeStyles((theme) => ({

    BtnCustom: {
        fontFamily: 'Raleway',
        textTransform: "uppercase",
        color: "#fff",
        backgroundColor: "#5ca9fb",
        backgroundImage: "linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)",
        padding: "10px 34px",
        letterSpacing: "1px",
        margin: 0,
        fontSize: "12px",
        fontWeight: "500",
        borderRadius: "20px",
        transition: "all 0.5s linear",
        border: 0,
        outline: "none",
        // marginTop: "30px"
    },

    containerStyle: {
        padding: '50px',
        fontFamily: '"Raleway", sans-serif',
        borderRadius: "15px",
        backgroundColor: "white",
        boxShadow: "10px 5px 20px #e2e2d0"
    },

    descPart: {
        paddingTop: "30px"
    },

    pFlag: {
        fontWeight: "bold"
    },
    outContainerStyle: {
        paddingBottom: "30px",
        minHeight: "300px",
    }

}));

export default function CourseTeacher(props) {
    // const base64String = btoa(String.fromCharCode(...new Uint8Array(props.teacherInfo.image.data)));
    const courseId = useParams()
    const classes = useStyles();

    const [loading, setLoading] = useState(false)

    return (
        <>
            <div className={classes.outContainerStyle}>
                <Container className={classes.containerStyle}>
                    <Row className="section-title" style={{ marginBottom: "40px", }}>
                        <h2 style={{
                            background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: "500",
                            margin: 'auto'
                        }}>
                            Course's Instructor
                            <span></span>
                        </h2>
                    </Row>
                    <div className="wrapper">
                        <div className="profile-card js-profile-card">
                            <div className="profile-card__img">
                                <img
                                    src={props.teacherInfo.image ? props.teacherInfo.image : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"}
                                    alt="profile card" />
                            </div>

                            <div className="profile-card__cnt js-profile-cnt">
                                <div className="profile-card__name">{props.teacherInfo.firstName + ' ' + props.teacherInfo.lastName}</div>
                                <div className="profile-card__txt">
                                    <p className="teacher_desc">
                                        {props.teacherInfo.desc}
                                    </p>
                                </div>
                                <div className="profile-card-loc">
                                    <span className="profile-card-loc__txt">
                                        {props.teacherInfo.email}
                                    </span>
                                </div>
                            </div>

                        </div>

                    </div>
                    {/* <Row className="section-title" style={{ marginBottom: "0", }}>
                        <h2 style={{
                            background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: "500",
                        }}>
                            Instructor Information
                            <span></span>
                        </h2>
                    </Row>
                    <Row className={classes.descPart}>
                        <p style={{ paddingBottom: "30px" }}>{props.teacherInfo.firstName + ' ' + props.teacherInfo.lastName + " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum"}</p>
                    </Row> */}
                </Container>
            </div>
        </>
    );
}

