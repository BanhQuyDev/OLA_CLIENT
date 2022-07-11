import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CBadge
} from '@coreui/react'

// import usersData from './UsersData'
import { getAllStudents, getAllTeachers, getAllAdmins } from 'src/services/user.services'
// import Button from '@mui/material/Button';
import ConfirmationDialog from 'src/reusable/confirmationDialog';
import { actionDisableUser, actionActivateUser } from 'src/services/user.services';
import { toast } from 'react-toastify';
import LinearProgress from '@mui/material/LinearProgress';

const Users = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  // const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  // const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [pageStudent, setPageStudent] = useState(1)
  const [pageTeacher, setPageTeacher] = useState(1)
  const [pageAdmin, setPageAdmin] = useState(1)
  const [allStudents, setAllStudents] = useState([])
  const [allAdmins, setAllAdmins] = useState([])
  const [allTeachers, setAllTeachers] = useState([])
  const [openDialogActive, setOpenDialogActive] = useState(false)
  const [openDialogDisable, setOpenDialogDisable] = useState(false)
  const [selectedUser, setSelectedUser] = useState(undefined)

  const pageChangeStudent = newPage => {
    if (pageStudent !== newPage) {
      setPageStudent(newPage)
    }
  }

  const pageChangeTeacher = newPage => {
    if (pageTeacher !== newPage) {
      setPageTeacher(newPage)
    }
  }

  const pageChangeAdmin = newPage => {
    if (pageAdmin !== newPage) {
      setPageAdmin(newPage)
    }
  }

  useEffect(() => {
    const getAllUsersData = async () => {
      setLoading(true)
      const students = await getAllStudents()
      if (students.status === 200) {
        setAllStudents(students.data)
      }

      const teachers = await getAllTeachers()
      if (teachers.status === 200) {
        setAllTeachers(teachers.data)
      }

      const admins = await getAllAdmins()
      if (admins.status === 200) {
        setAllAdmins(admins.data)
      }
      setLoading(false)
    }
    getAllUsersData()
    setPageStudent(1)
    setPageTeacher(1)
    setPageAdmin(1)
  }, [])

  const getBadge = (status) => {
    switch (!!status) {
      case true: return 'success'
      case false: return 'danger'
    }
  }

  const handleChangeAccountStatus = (item, type) => {
    setSelectedUser(item)
    if (type === 'Active') {
      // active -> disable
      setOpenDialogDisable(true)
    } else {
      // disable -> active
      setOpenDialogActive(true)
    }
  }

  const disableUser = async () => {
    setLoading(true)
    let teacherType = undefined
    if (selectedUser.role === 'teacher' && selectedUser.type) {
      teacherType = selectedUser.type
    }
    const { status, data } = await actionDisableUser(selectedUser.id, selectedUser.role, teacherType)
    if (status === 200) {
      if (data.message === "Delete Successfully!!") {
        toast.success('Update user status successfully')
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Something went wrong while changing user status')
    }
    setLoading(false)
    setSelectedUser(undefined)
  }

  const activateUser = async () => {
    setLoading(true)
    const { status, data } = await actionActivateUser(selectedUser.id, selectedUser.role)
    if (status === 200) {
      toast.success('Update user status successfully')
    } else {
      toast.error('Something went wrong while changing user status')
    }
    setLoading(false)
    setSelectedUser(undefined)
  }

  return (
    <>
      {loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null}
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <h5>All Students</h5>
              {/* <small className="text-muted"> example</small> */}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                columnFilter
                tableFilter={{ 'placeholder': 'Type to search…' }}
                sorter
                items={allStudents}
                fields={[
                  { key: 'id', _classes: 'font-weight-bold' },
                  'userName', 'email', 'nationality',
                  {
                    key: 'show_details',
                    label: '',
                    sorter: false,
                    filter: false
                  }
                ]}
                hover
                striped
                itemsPerPage={6}
                activePage={pageStudent}
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}/${item.role.toLowerCase()}`)}
                scopedSlots={{
                  'show_details':
                    (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => history.push(`/users/${item.id}/${item.role.toLowerCase()}`)}
                          >
                            {'View detail'}
                          </CButton>
                        </td>
                      )
                    },
                }}
              />
              <CPagination
                activePage={pageStudent}
                onActivePageChange={pageChangeStudent}
                pages={Math.ceil(allStudents.length / 6)}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <hr></hr>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <h5>All Teachers</h5>
              {/* <small className="text-muted"> example</small> */}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                columnFilter
                tableFilter={{ 'placeholder': 'Type to search…' }}
                sorter
                items={allTeachers}
                fields={[
                  { key: 'id', _classes: 'font-weight-bold' },
                  'userName', 'email', 'nationality', 'Account Status',
                  {
                    key: 'show_details',
                    label: '',
                    sorter: false,
                    filter: false
                  }
                ]}
                hover
                striped
                itemsPerPage={6}
                activePage={pageTeacher}
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}/${item.role.toLowerCase()}`)}
                scopedSlots={{
                  'Account Status':
                    (item) => {
                      const type = item.active ? 'Active' : 'Disabled'
                      return (
                        <td>
                          <CBadge style={{ cursor: 'pointer' }} onClick={() => handleChangeAccountStatus(item, type)} color={getBadge(item.active)}>
                            {type}
                          </CBadge>
                        </td>
                      )
                    },
                  'show_details':
                    (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => history.push(`/users/${item.id}/${item.role.toLowerCase()}`)}
                          >
                            {'View detail'}
                          </CButton>
                        </td>
                      )
                    },
                }}
              />
              <CPagination
                activePage={pageTeacher}
                onActivePageChange={pageChangeTeacher}
                pages={Math.ceil(allTeachers.length / 6)}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <hr></hr>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <h5>All Admins</h5>
              {/* <small className="text-muted"> example</small> */}
            </CCardHeader>
            <CCardBody>
              <CDataTable
                columnFilter
                tableFilter={{ 'placeholder': 'Type to search…' }}
                sorter
                items={allAdmins}
                fields={[
                  { key: 'id', _classes: 'font-weight-bold' },
                  'userName', 'email', 'nationality', 'Account Status',
                  {
                    key: 'show_details',
                    label: '',
                    sorter: false,
                    filter: false
                  }
                ]}
                hover
                striped
                itemsPerPage={6}
                activePage={pageAdmin}
                // clickableRows
                // onRowClick={(item) => history.push(`/users/${item.id}/${item.role.toLowerCase()}`)}
                scopedSlots={{
                  'Account Status':
                    (item) => {
                      const type = item.active ? 'Active' : 'Disabled'
                      return (
                        <td>
                          <CBadge style={{ cursor: 'pointer' }} onClick={() => handleChangeAccountStatus(item, type)} color={getBadge(item.active)}>
                            {type}
                          </CBadge>
                        </td>
                      )
                    },
                  'show_details':
                    (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                            onClick={() => history.push(`/users/${item.id}/${item.role.toLowerCase()}`)}
                          >
                            {'View detail'}
                          </CButton>
                        </td>
                      )
                    },
                }}
              />
              <CPagination
                activePage={pageAdmin}
                onActivePageChange={pageChangeAdmin}
                pages={Math.ceil(allAdmins.length / 6)}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ConfirmationDialog open={openDialogActive} setOpen={setOpenDialogActive} title="Are you sure to activate this user ?" onAgreeFn={activateUser} />
      <ConfirmationDialog open={openDialogDisable} setOpen={setOpenDialogDisable} title="Are you sure to disable this user ?" onAgreeFn={disableUser} />
    </>
  )
}

export default Users
