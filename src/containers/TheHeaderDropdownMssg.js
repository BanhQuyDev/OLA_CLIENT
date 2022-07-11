import React, { useEffect, useMemo, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import LinearProgress from '@mui/material/LinearProgress';
import { useAuthContext } from 'src/context/AuthContext';
import { getUserNotification, updateNotificationStatus } from 'src/services/user.services';
import { toast } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';

const TheHeaderDropdownMssg = () => {
  const itemsCount = 4
  const auth = useAuthContext()
  const currentUser = JSON.parse(auth.user)
  const [userAllNoti, setUserAllNoti] = useState([])
  const [currentShowNoti, setCurrentShowNoti] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllNotiOfUser = async () => {
    setLoading(true)
    const { status, data } = await getUserNotification(currentUser.id)
    if (status === 200) {
      setUserAllNoti(data.getNotification)
      setCurrentShowNoti(data.getNotification.slice(0, 10))
    } else {
      toast.error('Something went wrong while loading notification')
    }
    setLoading(false)
  }

  useEffect(() => {
    getAllNotiOfUser()
  }, [])

  const countUnreadNotification = useMemo(() => {
    return userAllNoti.filter(n => n.status !== "read").length
  }, [userAllNoti])

  const handleViewMoreNotification = () => {
    const newNoti = userAllNoti.slice(0, currentShowNoti.length + 10)
    setCurrentShowNoti(newNoti)
  }

  const markAsRead = async () => {
    const unreadNoti = userAllNoti.filter(n => n.status !== "read")
    if (unreadNoti.length > 0) {
      setLoading(true)
      for (const noti of unreadNoti) {
        const { status, data } = await updateNotificationStatus(noti.id)
        if (status === 200) {
        } else {
          toast.error('Something went wrong while loading notification')
        }
      }
      setLoading(false)
      getAllNotiOfUser()
    } else {
      toast.warn('You have no unread notification')
    }
  }

  return (
    <>
      <CDropdown
        inNav
        className="c-header-nav-item mx-2"
        direction="down"
      >
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          {/* <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{itemsCount}</CBadge> */}
          <CIcon name="cil-bell" />
          <CBadge shape="pill" color="info">{countUnreadNotification}</CBadge>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          {
            loading ? (<LinearProgress sx={{ margin: '30px 0 30px 0' }} />) : null
          }
          <CDropdownItem
            header
            tag="div"
            color="light"
          >
            <strong>You have {countUnreadNotification} new messages</strong>
          </CDropdownItem>
          {
            currentShowNoti.map((n, idx) => {
              const [title, content] = n.content.split('&&&')
              return (
                <div key={n.id}>
                  <CDropdownItem>
                    <div className="message">
                      <div>
                        <Tooltip title={new Date(n.updatedAt).toLocaleString()} >
                          <small className="text-muted float-right mt-1">{new Date(n.updatedAt).toLocaleDateString().split(',')[0]}</small>
                        </Tooltip>

                      </div>
                      <div className="text-truncate font-weight-bold">
                        <Tooltip title={title} >
                          <span>{title}</span>
                        </Tooltip>
                      </div>
                      <div style={{
                        width: '350px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }} className="small text-muted text-truncate">
                        <Tooltip title={content} >
                          <span>{content}</span>
                        </Tooltip>
                      </div>
                    </div>
                  </CDropdownItem>
                </div>
              )
            })
          }
          <CDropdownItem onClick={() => handleViewMoreNotification()} className="text-center border-top"><strong>View more notification</strong></CDropdownItem>
          <CDropdownItem onClick={() => markAsRead()} className="text-center border-top"><strong>Mark all as read</strong></CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default TheHeaderDropdownMssg