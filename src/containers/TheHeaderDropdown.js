import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Avatar from '@mui/material/Avatar';
import { useAuthContext } from 'src/context/AuthContext';
import { useHistory } from 'react-router-dom';

const TheHeaderDropdown = () => {
  const auth = useAuthContext()
  const currentUser = JSON.parse(auth.user)
  const history = useHistory()
  return (
    <>
      <CDropdown
        inNav
        className="c-header-nav-items mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            {/* <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          /> */}
            <Avatar sx={{ width: 30, height: 30 }}>{currentUser.userName[0].toUpperCase()}</Avatar>
          </div>

        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          {/* <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
          <CDropdownItem
            header
            tag="div"
            className="text-center"
          >
            <strong>{currentUser.userName}</strong>
          </CDropdownItem>
          <CDropdownItem
            header
            tag="div"
            color="light"
            className="text-center"
          >
            <strong>Settings</strong>
          </CDropdownItem>
          <CDropdownItem onClick={() => history.push(`/users/${currentUser.id}/${currentUser.role}`)}>
            <CIcon name="cil-user" className="mfe-2" />
            Profile
          </CDropdownItem>
          {/* <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem> */}
          {/* <CDropdownItem onClick={() => history.push('/membership')} >
          <CIcon name="cil-credit-card" className="mfe-2" />
          Membership
        </CDropdownItem> */}
          {/* <CDropdownItem>
          <CIcon name="cil-file" className="mfe-2" />
          Projects
          <CBadge color="primary" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}
          <CDropdownItem divider />
          <CDropdownItem onClick={() => auth.logOut()}>
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default TheHeaderDropdown
