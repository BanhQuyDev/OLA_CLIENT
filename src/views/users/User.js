import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import {
  Button,
} from "react-bootstrap";
import { useHistory } from 'react-router-dom'
import ViewFeedback from '../feedback/viewFeedback';
import { getDetailStudent, getDetailAdmin, getDetailTeacher } from '../../services/user.services'
import { useAuthContext } from 'src/context/AuthContext'


const User = ({ match }) => {
  //TODO handle allow edit profile and check role (of login user)
  const history = useHistory()
  const roleUser = match.params.role
  const auth = useAuthContext()
  const currentUser = JSON.parse(auth.user)
  const fieldToExclude = ['id', 'birthday', 'image', 'desc']

  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const getData = async () => {
      let userData
      if (roleUser === 'student') {
        userData = await getDetailStudent(match.params.id)
      } else if (roleUser === 'teacher') {
        userData = await getDetailTeacher(match.params.id)
      } else if (roleUser === 'admin') {
        userData = await getDetailAdmin(match.params.id)
      } else {
        userData = {}
      }

      if (userData.status === 200 && !userData.message) {
        setUserInfo({...userData.data[0], major: userData.data[1].major})
      }
    }
    getData()
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              Username: {userInfo.userName}
              {
                (currentUser.id.toString() === match.params.id || currentUser.role === 'admin') ? (
                  <Button onClick={() => history.push(`/users/editUser/${match.params.id}/${roleUser}`)} style={{ marginLeft: '20px' }}>Edit Profile</Button>
                ) : null
              }

            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    Object.entries(userInfo).map(([key, value], index) => {
                      if (!fieldToExclude.includes(key) && value != undefined) {
                        return (
                          <tr key={index.toString()}>
                            <td>{`${key}:`}</td>
                            <td><strong>{value}</strong></td>
                          </tr>
                        )
                      } else return null
                    })
                  }
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
        <br />
      </CRow>
      {
        match.params.role === 'teacher' ? (
          <>
            <CRow>
              <h3 style={{ marginLeft: '20px' }}>All Feedback</h3>
            </CRow>
            <CRow>
              <ViewFeedback type='teacher' id={match.params.id} />
            </CRow>
          </>
        ) : null
      }

    </>
  )
}

export default User
