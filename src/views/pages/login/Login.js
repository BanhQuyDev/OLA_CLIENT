import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { useAuthContext } from 'src/context/AuthContext'
import { loginFunction } from 'src/services/login.services'
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';

const Login = () => {
  const auth = useAuthContext();
  const history = useHistory()
  const usernameRef = useRef('')
  const passwordRef = useRef('')
  const [loading, setLoading] = useState(false)

  const loginUser = async () => {
    setLoading(true)
    const { status, data } = await loginFunction(usernameRef.current.value, passwordRef.current.value);
    setLoading(false)
    if (data && data.message === "login successfully") {
      const dataToSet = { user: data.userLogin }
      auth.logIn(dataToSet);
      history.push('/mainPage');
    } else {
      toast.error('Login failed')
    }
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                  // onSubmit={(e) => { console.log('here') }}
                  >
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput innerRef={usernameRef} type="text" placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput innerRef={passwordRef} type="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={() => loginUser()} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                    <Link to="/landingPage">
                      <CButton color="primary" className="mt-3" >To Landing Page</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        {
          loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
        }
      </CContainer>
    </div>
  )
}

export default Login
