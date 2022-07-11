import React, { useEffect, useState } from "react";
import { Container, Row, Col } from 'reactstrap';
import { makeStyles } from "@material-ui/core/styles";
import SlideManyCourse from '../../../utilities/slideManyCourse'



const useStyles = makeStyles((theme) => ({

    containerStyle: {
        paddingBottom: "50px",
        paddingTop: "50px",
        fontFamily: '"Raleway", sans-serif',
        textAlign: "center !important",

        // backgroundColor: "yellow"      
    },
}))

function CourseLearningPath(props) {
    const [unitNames, setUnitNames] = useState([])
    useEffect(() => {
        if (props.dataFeature) {
            let listCourseLearningPath = []
            props.dataFeature.units.forEach(u => {
                listCourseLearningPath.push(u.name)
            })
            setUnitNames(listCourseLearningPath)
        }
    }, [props.dataFeature])

    const classes = useStyles();
    return (
        <div style={{ background: "#f6f6f6", minHeight: "500px", }}>
            <Container className={classes.containerStyle}>
                <Col
                    md={{ size: 8, offset: 2 }}
                    className="section-title"
                    style={{ marginBottom: "10px" }}
                    id="CLPath">
                    <h2 style={{
                        fontWeight: "500",
                        fontFamily: "Raleway",
                        background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Course's Learning Path</h2>

                </Col>
            </Container>
            <Container style={{ paddingBottom: "100px" }}>
                <Row>
                    <Col xs="12" md={{ size: 12, offset: 0 }}>
                        <SlideManyCourse
                            units={props.dataFeature?.units}
                        />
                    </Col>

                </Row>
            </Container>
        </div>
    );
}


export default CourseLearningPath;
