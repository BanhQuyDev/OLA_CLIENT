import React from 'react'
import { useAuthContext } from 'src/context/AuthContext'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  const auth = useAuthContext()

  return (
    <div className="c-app c-default-layout" style={{ backgroundColor: '#f5f7f7' }}>
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
