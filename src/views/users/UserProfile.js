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
import ChangePassword from './userComponents/changePassword';
import { getDetailStudent, getDetailAdmin, getDetailTeacher, updateUserProfile } from '../../services/user.services'
import { useAuthContext } from "src/context/AuthContext";
import LinearProgress from '@mui/material/LinearProgress';
import { toast } from "react-toastify";
import { allCountries } from "./countriesData";
import { fileUrl } from 'src/utilities/shared-constants';
import { updateUserAvatar } from "../../services/user.services";
import { getMultipleUnitPresignedUrls, uploadMultipleUnitPresignedUrls } from "src/services/courses.services";

const allMajors = ['Speaking Trainer', 'Writing Trainer', 'Ielts Trainer', 'Toeic Trainer', 'Workplace English Trainer', 'Casual Trainer']
function User() {
  const params = useParams()
  const userId = params.id
  const userRole = params.role
  const auth = useAuthContext()
  const currentUser = JSON.parse(auth.user)
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [access, setAccess] = useState(false)
  const [userAvatar, setUserAvatar] = useState(undefined)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = { ...userInfo }
    updatedProfile.userName = e.target[1].value
    updatedProfile.email = e.target[2].value
    updatedProfile.firstName = e.target[3].value
    updatedProfile.lastName = e.target[4].value
    updatedProfile.nationality = e.target[6].value
    if (userInfo.major) {
      updatedProfile.major = e.target[7].value
      updatedProfile.desc = e.target[8].value
    } else {
      updatedProfile.desc = e.target[7].value
    }

    console.log(updatedProfile)
    setLoading(true)
    const { status } = await updateUserProfile(userId, userRole, updatedProfile)
    if (status === 200) {
      toast.success('Updated user info successfully')
    } else {
      toast.error('Something wrong happened')
    }
    setLoading(false)
  }

  const getData = async () => {
    setLoading(true)
    let userData
    if (userRole === 'student') {
      userData = await getDetailStudent(userId)
    } else if (userRole === 'teacher') {
      userData = await getDetailTeacher(userId)
    } else if (userRole === 'admin') {
      userData = await getDetailAdmin(userId)
    } else {
      userData = {}
    }
    if (userData.status === 200 && !userData.message) {
      console.log(userData)
      setUserInfo({ ...userData.data[0], major: userData.data[1].major })
    } else {
      toast.error('Something wrong happened')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (currentUser.id.toString() === userId || currentUser.role === 'admin') {
      setAccess(true)
    }
  }, [])

  useEffect(() => {
    if (access) {
      getData()
    }
  }, [access])

  const handleChangeAvatar = async (file) => {
    if (file) {
      setLoading(true)
      let imageAvatarURL_DB = null
      const imageUrl = await getMultipleUnitPresignedUrls(['Avatar_user_id_' + userInfo.id], 'image')
      const statusImage = await uploadMultipleUnitPresignedUrls([file], imageUrl, 'image')
      if (statusImage[0].status === "fulfilled") {
        imageAvatarURL_DB = fileUrl + 'Avatar_user_id_' + userInfo.id
      } else {
        toast.error('Error uploading new image')
      }
      const { status } = await updateUserAvatar(userInfo.id, imageAvatarURL_DB)
      if (status === 200) {
        toast.success('Update user avatar successfully')
        setLoading(false)
        getData()
      } else {
        setLoading(false)
        toast.error('Error update new avatar')
      }
    }
  }


  const getImage = () => {
    if(userInfo && userInfo.image){
      return userInfo.image
    } else{
      return 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    }
  }

  return (
    <>
      {
        loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
      }
      {
        !userInfo.id ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : (
          <Container fluid>
            <Row>
              <Col md="8">
                <Card>
                  <Card.Header>
                    <Card.Title as="h4">Edit Profile</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>Role (disabled)</label>
                            <Form.Control
                              defaultValue={userInfo.role}
                              disabled
                              placeholder="Role"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Username</label>
                            <Form.Control
                              defaultValue={userInfo.userName}
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
                              defaultValue={userInfo.email}
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
                              defaultValue={userInfo.firstName}
                              placeholder="Company"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Last Name</label>
                            <Form.Control
                              defaultValue={userInfo.lastName}
                              placeholder="Last Name"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label>Level</label>
                            <Form.Control
                              defaultValue={userInfo.level}
                              disabled
                              placeholder="Level"
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>Nationality</label>
                            <Form.Control defaultValue={userInfo.nationality} as="select">
                              {
                                allCountries.map(nation => (
                                  <option key={nation.code}>{nation.name}</option>
                                ))
                              }
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        {
                          userInfo.major ? (
                            <Col className="px-1" md="4">
                              <Form.Group>
                                <label>Major</label>
                                <Form.Control defaultValue={userInfo.major} as="select">
                                  {
                                    allMajors.map(major => (
                                      <option key={major}>{major}</option>
                                    ))
                                  }
                                </Form.Control>
                              </Form.Group>
                            </Col>
                          ) : null
                        }
                      </Row>
                      {/* <Row>
                        <Col md="4">
                          <Form.Group>
                            <label>Birthday</label>
                            <Form.Control
                              defaultValue={userInfo.birthDay}
                              type='date'
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row> */}
                      {/* <br />
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Test"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Test"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          defaultValue="70000"
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row> */}
                      <br />
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>About Me</label>
                            <Form.Control
                              cols="80"
                              defaultValue={userInfo.desc}
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
                        Update Profile
                      </Button>
                      <div className="clearfix"></div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <div className="card-image">
                    {/* <img
                  alt="..."
                  // src={
                  //   require()
                  //     .default
                  // }
                ></img> */}
                  </div>
                  <Card.Body>
                    <div className="author" style={{ display: 'flex', justifyContent: 'center' }}>
                      <label htmlFor="fileInputAvatar">
                        <img
                          alt="..."
                          style={{ borderRadius: '50%', width: '120px', margin: 'auto', cursor: 'pointer' }}
                          src={getImage()}
                        ></img>
                      </label>
                      <input onChange={e => handleChangeAvatar(e.target.files[0])} style={{ display: 'none' }} id="fileInputAvatar" type="file" accept="image/*"></input>
                    </div>
                    <hr />
                    <p className="description">Bio:</p>
                    <p className="description text-center">
                      {userInfo.desc}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <ChangePassword />
            </Row>
          </Container>
        )
      }
    </>
  );
}

export default User;
