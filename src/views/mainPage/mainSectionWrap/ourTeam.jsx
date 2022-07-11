import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';

export class OurTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTeam: [],
            loading: "init"
        }
    }

    componentDidMount() {
        this.setState({
            dataTeam: [{
                "img": "img/team/01.jpg",
                "name": "John Doe",
                "job": "Director"
            },
            {
                "img": "img/team/02.jpg",
                "name": "Mike Doe",
                "job": "Senior Designer"
            }, {
                "img": "img/team/03.jpg",
                "name": "Jane Doe",
                "job": "Senior Designer"
            },
            {
                "img": "img/team/04.jpg",
                "name": "Karen Doe",
                "job": "Project Manager"
            }
            ]
        })
    }


    render() {
        return (
            <div id="team" className="text-center">
                <Container>
                    <Col md={{ size: 8, offset: 2 }} className="section-title">
                        <h2>Meet the Team</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
                            dapibus leonec.
            </p>
                    </Col>
                    <Row>
                        {
                            this.state.dataTeam.map((d, i) => (
                                <Col md="3" sm="6" key={`${d.name}-${i}`} className="team">
                                    <div className="thumbnail">
                                        {" "}
                                        <img src={d.img} alt="..." className="team-img" />
                                        <div className="caption">
                                            <h4>{d.name}</h4>
                                            <p>{d.job}</p>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default OurTeam;
