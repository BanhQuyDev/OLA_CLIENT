import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'
import { registerNewUser } from 'src/services/user.services'
import { toast } from 'react-toastify'

const Register = () => {
  const history = useHistory()

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const newProfile = {}
    newProfile.userName = e.target[0].value
    newProfile.email = e.target[1].value
    newProfile.password = e.target[2].value
    newProfile.firstName = e.target[4].value
    newProfile.lastName = e.target[5].value
    const repeatedPassword = e.target[3].value
    const isEmpty = !Object.values(newProfile).some(x => x !== null && x !== '');
    if (!isEmpty) {
      if (newProfile.password === repeatedPassword) {
        const { status, data } = await registerNewUser(newProfile)
        if (status === 201) {
          toast.success('Create user successfully, go to login page to login')
        } else {
          toast.error('Something went wrong')
        }
      } else {
        toast.warn('Two passwords must be matched')
      }
    } else {
      toast.warn('Please fill all the fields')
    }

  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleFormSubmit}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your student account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CRow>
                    <CCol xs="12" sm="6">
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="new-password" />
                      </CInputGroup>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Repeat password" autoComplete="new-password" />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol xs="12" sm="6">
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="First name" />
                      </CInputGroup>
                    </CCol>
                    <CCol xs="12" sm="6">
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Last name" />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CButton color="success" type='submit' block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="12">
                    <CButton className="btn-twitter mb-1" onClick={() => { history.push('/login') }} block>Go To Login Page</CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
