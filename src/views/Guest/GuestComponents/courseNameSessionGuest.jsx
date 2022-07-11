import React from "react";
import { Container, Row, Col } from 'reactstrap';
import { makeStyles } from "@material-ui/core/styles";



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
        backgroundColor: 'rgba(0,0,0, 0.3)',
    },

    BtnCustom: {
        fontFamily: 'Raleway',
        textTransform: "uppercase",
        padding: "10px 40px",
        letterSpacing: "1px",
        margin: 0,
        fontSize: "12px",
        fontWeight: "500",
        borderRadius: "20px",
        transition: "all 0.5s linear",
    },

    containerStyle: {
    },

    textDescription: {
        color: '#5ca9fb'
    }
}));

export default function CourseNameSessionGuest(props) {
    const classes = useStyles();

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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );

}

