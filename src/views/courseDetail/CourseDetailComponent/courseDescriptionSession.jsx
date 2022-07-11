import React from "react";
import { Container, Row } from 'reactstrap';
import { makeStyles } from "@material-ui/core/styles";



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
        // backgroundColor: "red",
        paddingTop: "80px",
        paddingBottom: "50px",
        minHeight: "300px",
    }

}));

export default function CourseDescriptionSession(props) {
    const classes = useStyles();
    return (
        <div className={classes.outContainerStyle}>
            <Container className={classes.containerStyle}>
                <Row className="section-title" style={{ marginBottom: "0", }}>
                    <h2 style={{
                        background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: "500",
                    }}>
                        Course's Description
                        <span></span>
                    </h2>
                </Row>
                <Row className={classes.descPart}>
                    <p style={{ paddingBottom: "30px" }}>{props.courseDesc + " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum"}</p>
                </Row>
                <Row>
                    <p style={{ paddingBottom: "10px" }}>{`Course's Level: ` + props.courseLevel}</p>
                </Row>
                <Row>
                    <p>{`Course's Exp: ` + props.courseExp}</p>
                </Row>
            </Container>
        </div>
    );

}

