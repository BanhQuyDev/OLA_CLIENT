import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { useAuthContext } from "src/context/AuthContext";
import { checkStudentRegisterCourseStatus, studentRegisterCourse, studentUnRegisterCourse, getStudentMembership } from "src/services/user.services";
import { toast } from "react-toastify";



const useStyles = makeStyles((theme) => ({
    introDetail: {
        display: "table",
        height: "100%",
        width: "100%",
        padding: 0,
    },

    overlay: {
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        width: "100%",
        height: "100%"
    },

    introCourseBox: {
        padding: "10%",
        marginTop: "25%",
        textAlign: "left",
        borderRadius: '20px',
        backgroundColor: 'rgba(255,255,255, 0.9)',
        boxShadow: '0px 13px 10px -7px rgba(0, 0, 0, 0.1)'
        // textShadow: '-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white'
    },

    BtnCustom: {
        fontFamily: 'Raleway',
        textTransform: "uppercase",
        // color: "#fff",
        // backgroundColor: "#5ca9fb",
        // backgroundImage: "linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)",
        padding: "10px 40px",
        letterSpacing: "1px",
        margin: 0,
        fontSize: "12px",
        fontWeight: "500",
        borderRadius: "20px",
        transition: "all 0.5s linear",
        // border: 0,
        // outline: "none",
    },

    containerStyle: {
    },

    textDescription: {
        color: '#5ca9fb'
    }
}));

export default function CourseNameSession(props) {
    const classes = useStyles();
    const auth = useAuthContext()
    const currentUser = JSON.parse(auth.user)
    const [paidStudent, setPaidStudents] = useState(false)
    const history = useHistory()
    const [stop, setStop] = useState(false)
    // const [regStatus, setRegStatus] = useState(false)

    useEffect(() => {
        if (!stop && currentUser.role === 'student') {
            const getMembership = async () => {
                const { status, data } = await getStudentMembership(currentUser.id)
                if (status === 200) {
                    if (data[0] !== 'free') {
                        setPaidStudents(true)
                    }
                } else {
                    toast.error('Something went wrong, please try again later')
                }
            }
            getMembership()
        }
        return () => {
            setStop(true)
        }
    }, []);

    const handleRegCourse = async () => {
        if (props.isFree || paidStudent) {
            if (props.regStatus) {
                // unregister course
                const status = await studentUnRegisterCourse(currentUser.id, props.courseID)
                if (status && status === 200) {
                    toast.success('Unregistered course !')
                    props.setRegStatus(false)
                } else {
                    toast.error('Something wrong happened')
                }
            } else {
                // register course
                const { status, data } = await studentRegisterCourse(currentUser.id, props.courseID)
                if (status === 201) {
                    if (data.id_student) {
                        toast.success('Registered course !')
                        props.setRegStatus(true)
                    } else {
                        toast.error(data.message)
                    }
                } else {
                    toast.error('Something wrong happened')
                }
            }
        } else {
            toast.warn('You need to have membership to register this course, redirecting...')
            setTimeout(() => history.push('/membership'), 1000)

        }
    }
    function ButtonCustomRole() {
        if (currentUser.role == "student") {
            return (
                <Button
                    variant="contained"
                    className={classes.BtnCustom}
                    onClick={() => handleRegCourse()}
                >{props.regStatus ? 'UNREGISTER' : 'REGISTER'}
                </Button>
            )
        } else {
            return null
        }
    }
    return (
        <div
            className="intro"
            style={{
                backgroundColor: 'rgba(134,172,183, 0.1)',
                height: "70vh"

            }}
        >
            <div className={classes.overlay} style={{ backgroundImage: props.courseImage ? `url("${props.courseImage}")` : null, }}>
                <Container>
                    <Row>
                        <Col xs="12" md={{ size: 5, offset: 0 }}>
                            <div className={classes.introCourseBox}>
                                <h1 className={classes.textDescription}>
                                    {props.courseName}
                                    <span></span>
                                </h1>
                                <p className={classes.textDescription}>
                                    {"This course would be a perfect match for anyone who is into: " + props.courseShortDescription + "..."}
                                </p>
                                <br />
                                {/* <Button
                                    outline
                                    size="lg"
                                    color="secondary"
                                // onClick={this.OnClickRedirect}
                                style={{color: '#f1f1f1'}}
                                >Explore All Courses
                                    </Button>{' '} */}
                                {/* <button
                                    className={classes.BtnCustom}
                                    onClick={registerOnClick}
                                >
                                    {registerState[1]}
                                </button> */}
                                <ButtonCustomRole />

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );

}

