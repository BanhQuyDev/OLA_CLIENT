import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
// import aboutPic from '../../../assets/imgs/aboutPic.jpg'
import ImgAccordion from '../../../utilities/imgAccordion'
import styles from './aboutSession.module.css'


export class AboutSession extends Component {
    Why = [
        "Lorem ipsum dolor",
        "Tempor incididunt",
        "Lorem ipsum dolor",
        "Incididunt ut labore"
    ]
    Why2 = [
        "Aliquip ex ea commodo",
        "Lorem ipsum dolor",
        "Exercitation ullamco",
        "Lorem ipsum dolor"
    ]
    render() {
        return (
            <div id="about">
                <Container>
                    <Row>
                        {/* <Col xs="12" md="6"> <img src={aboutPic} className="img-responsive" alt="" /> </Col> */}
                        <Col xs="12" md="6"> <ImgAccordion /> </Col>
                        <Col xs="12" md="6">
                            <div>
                                <h2
                                    style={{
                                        background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                    className={styles.aboutUs}
                                >About Us</h2>
                                <br />
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <br />
                                <h2
                                    style={{
                                        background: 'linear-gradient(to right, #5ca9fb 0%, #6372ff 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                    className={styles.aboutUs}
                                >Why Choose Us?</h2>
                                <br />
                                <div className="list-style">
                                    <Row>
                                        <Col lg="6" sm="6" xs="12" >
                                            <ul>
                                                {this.Why.map((d, i) => <li key={`${d}-${i}`}>{d}</li>)}
                                            </ul>
                                        </Col>
                                        <Col lg="6" sm="6" xs="12" >
                                            <ul>
                                                {this.Why2.map((d, i) => <li key={`${d}-${i}`}> {d}</li>)}

                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AboutSession
