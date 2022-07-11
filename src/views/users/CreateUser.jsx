import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { createNewUser } from '../../services/user.services'
import { useAuthContext } from "src/context/AuthContext";
import LinearProgress from '@mui/material/LinearProgress';
import { toast } from "react-toastify";
import { allCountries } from "./countriesData";


const allMajors = ['Speaking Trainer', 'Writing Trainer', 'Ielts Trainer', 'Toeic Trainer', 'Workplace English Trainer', 'Casual Trainer']
function CreateUser() {
    const params = useParams()
    const auth = useAuthContext()
    const currentUser = JSON.parse(auth.user)
    const [loading, setLoading] = useState(false)
    const [access, setAccess] = useState(false)
    const [disableMajor, setDisableMajor] = useState(true)


    const getTeacherType = (input) => {
        if (input.slice(0, 8) === 'Internal') return 'internal'
        else if (input.slice(0, 8) === 'External') return 'external'
        else return null
    }

    // this function is needed since teacher in selecting options can be internal or external, but the role is teacher either way
    const getRole = (input) => {
        if (input === 'Admin' || input === 'Student') return input.toLowerCase()
        else return 'teacher'
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newProfile = {}
        // newProfile.role = e.target[0].role
        newProfile.userName = e.target[1].value
        newProfile.email = e.target[2].value
        newProfile.firstName = e.target[3].value
        newProfile.lastName = e.target[4].value
        newProfile.password = e.target[5].value
        newProfile.nationality = e.target[6].value
        newProfile.type = getTeacherType(e.target[0].value)
        newProfile.major = e.target[7].value
        newProfile.desc = e.target[8].value
        console.log(newProfile)
        setLoading(true)
        const { status } = await createNewUser(getRole(e.target[0].value), newProfile)
        if (status === 201) {
            toast.success('Created user info successfully')
        } else {
            toast.error('Something wrong happened')
        }
        setLoading(false)
    }

    useEffect(() => {
        if (currentUser.role === 'admin') {
            setAccess(true)
        }
    }, [])

    const handleMajor = (role) => {
        if (role.toLowerCase().includes('teacher')) {
            setDisableMajor(false)
        } else {
            setDisableMajor(true)
        }
    }
    return (
        <>
            {
                !access ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : (
                    <>
                        {loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null}
                        <Container fluid>
                            <Row>
                                <Col md="12">
                                    <Card>
                                        <Card.Header>
                                            <Card.Title as="h4">Create Profile</Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                            <Form onSubmit={(e) => handleSubmit(e)}>
                                                <Row>
                                                    <Col className="pr-1" md="4">
                                                        <Form.Group>
                                                            <label>Role</label>
                                                            <Form.Control defaultValue={"Student"} onChange={e => handleMajor(e.target.value)} as="select">
                                                                <option>Student</option>
                                                                <option>Internal Teacher</option>
                                                                <option>External Teacher</option>
                                                                <option>Admin</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="px-1" md="4">
                                                        <Form.Group>
                                                            <label>Username</label>
                                                            <Form.Control
                                                                // defaultValue={userInfo.userName}
                                                                placeholder="Username"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="pl-1" md="4">
                                                        <Form.Group>
                                                            <label htmlFor="exampleInputEmail1">
                                                                Email address
                                                            </label>
                                                            <Form.Control
                                                                // defaultValue={userInfo.email}
                                                                placeholder="Email"
                                                                type="email"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col className="pr-1" md="4">
                                                        <Form.Group>
                                                            <label>First Name</label>
                                                            <Form.Control
                                                                // defaultValue={userInfo.firstName}
                                                                placeholder="First Name"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="px-1" md="4">
                                                        <Form.Group>
                                                            <label>Last Name</label>
                                                            <Form.Control
                                                                // defaultValue={userInfo.lastName}
                                                                placeholder="Last Name"
                                                                type="text"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="pl-1" md="4">
                                                        <Form.Group>
                                                            <label>Password</label>
                                                            <Form.Control
                                                                placeholder="Password"
                                                                type="password"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>

                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col className="pr-1" md="4">
                                                        <Form.Group>
                                                            <label>Nationality</label>
                                                            <Form.Control as="select">
                                                                {
                                                                    allCountries.map(nation => (
                                                                        <option key={nation.code}>{nation.name}</option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col className="px-1" md="4">
                                                        <Form.Group>
                                                            <label>Major</label>
                                                            <Form.Control disabled={disableMajor} defaultValue={"Ielts Trainer"} as="select">
                                                                {
                                                                    allMajors.map(major => (
                                                                        <option key={major}>{major}</option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col md="12">
                                                        <Form.Group>
                                                            <label>About Me</label>
                                                            <Form.Control
                                                                cols="80"
                                                                // defaultValue={userInfo.desc}
                                                                placeholder="Here can be your description"
                                                                rows="4"
                                                                as="textarea"
                                                            ></Form.Control>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Button
                                                    className="btn-fill pull-right"
                                                    type="submit"
                                                    variant="info"
                                                >
                                                    Create Profile
                                                </Button>
                                                <div className="clearfix"></div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            }
        </>
    );
}

export default CreateUser;
